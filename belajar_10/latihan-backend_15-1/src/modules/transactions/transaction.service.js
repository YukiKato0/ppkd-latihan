import TransactionModel from './transaction.model.js';
import { snap } from '../../config/midtrans.js';

class TransactionService {
  static async createTransaction(payload) {
    const { user_id, payment_method, items, customer_details, tax_percentage = 10 } = payload;

    if (!items || items.length === 0) {
      throw new Error('Daftar item belanja tidak boleh kosong');
    }

    const connection = await TransactionModel.getClient();

    try {
      await connection.beginTransaction();

      let calculatedSubtotal = 0;
      const orderItemsData = [];
      const midtransItemDetails = [];

      for (const item of items) {
        const product = await TransactionModel.getProductById(item.product_id);

        if (!product) {
          throw new Error(`Produk dengan ID ${item.product_id} tidak ditemukan`);
        }

        if (product.stock < item.qty) {
          throw new Error(`Stok produk "${product.name}" tidak mencukupi`);
        }

        const isStockUpdated = await TransactionModel.updateProductStock(connection, item.product_id, item.qty);
        if (!isStockUpdated) {
          throw new Error(`Gagal memperbarui stok produk ID ${item.product_id}`);
        }

        const itemTotal = product.price * item.qty;
        calculatedSubtotal += itemTotal;

        orderItemsData.push({
          product_id: product.id,
          qty: item.qty,
          price: product.price
        });

        midtransItemDetails.push({
          id: String(product.id),
          price: Number(product.price),
          quantity: item.qty,
          name: product.name
        });
      }

      const tax = (calculatedSubtotal * tax_percentage) / 100;
      const total = calculatedSubtotal + tax;

      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const order_number = `TRX-${dateStr}-${randomNum}`;

      let initialStatus = 'pending';
      let snapToken = null;
      let snapRedirectUrl = null;

      if (payment_method.toUpperCase() === 'CASH') {
        initialStatus = 'success';
      } else {
        if (tax > 0) {
          midtransItemDetails.push({
            id: 'TAX',
            price: Number(tax),
            quantity: 1,
            name: 'Pajak (Tax)'
          });
        }

        const midtransParams = {
          transaction_details: {
            order_id: order_number,
            gross_amount: Math.round(total)
          },
          item_details: midtransItemDetails,
          customer_details: {
            name: customer_details?.name || 'Customer',
            email: customer_details?.email || 'customer@example.com',
            phone: customer_details?.phone || '08123456789'
          }
        };

        const snapTransaction = await snap.createTransaction(midtransParams);
        snapToken = snapTransaction.token;
        snapRedirectUrl = snapTransaction.redirect_url;
      }

      const orderId = await TransactionModel.createOrder(connection, {
        order_number,
        user_id,
        payment_method,
        subtotal: calculatedSubtotal,
        tax,
        total,
        status: initialStatus,
        snap_token: snapToken,
        snap_redirect_url: snapRedirectUrl
      });

      for (const detail of orderItemsData) {
        await TransactionModel.createOrderDetail(connection, {
          order_id: orderId,
          product_id: detail.product_id,
          qty: detail.qty,
          price: detail.price
        });
      }

      await connection.commit();

      return {
        id: orderId,
        order_number,
        payment_method,
        status: initialStatus,
        total,
        snap_token: snapToken,
        snap_redirect_url: snapRedirectUrl
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async handleMidtransNotification(notificationPayload) {
    const statusResponse = await snap.transaction.notification(notificationPayload);

    const order_id = statusResponse.order_id;
    const transaction_status = statusResponse.transaction_status;
    const fraud_status = statusResponse.fraud_status;

    let orderStatus = 'pending';

    if (transaction_status === 'capture') {
      if (fraud_status === 'challenge') {
        orderStatus = 'challenge';
      } else if (fraud_status === 'accept') {
        orderStatus = 'success';
      }
    } else if (transaction_status === 'settlement') {
      orderStatus = 'success';
    } else if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
      orderStatus = 'failed';

      await TransactionModel.restoreProductStock(order_id);
    } else if (transaction_status === 'pending') {
      orderStatus = 'pending';
    }

    await TransactionModel.updateOrderStatus(order_id, orderStatus);

    return { order_id, orderStatus };
  }
}

export default TransactionService;