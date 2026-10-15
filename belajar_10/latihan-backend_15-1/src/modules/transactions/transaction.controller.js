import TransactionService from './transaction.service.js';

class TransactionController {
  static async create(req, res) {
    try {
      const { user_id, payment_method, items, customer_details, tax_percentage } = req.body;

      if (!user_id || !payment_method || !items) {
        return res.status(400).json({
          success: false,
          message: 'user_id, payment_method, dan items wajib diisi'
        });
      }

      const transaction = await TransactionService.createTransaction({
        user_id,
        payment_method,
        items,
        customer_details,
        tax_percentage
      });

      return res.status(201).json({
        success: true,
        message: 'Transaksi berhasil dibuat',
        data: transaction
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  static async handleNotification(req, res) {
    try {
      const result = await TransactionService.handleMidtransNotification(req.body);
      return res.status(200).json({
        success: true,
        message: 'Notifikasi Midtrans berhasil diproses',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default TransactionController;