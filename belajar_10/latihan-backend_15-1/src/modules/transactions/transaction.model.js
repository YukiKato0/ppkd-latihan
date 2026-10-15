import db from '../../config/db.js';

class TransactionModel {
  static async getClient() {
    return await db.getConnection();
  }

  static async findAllOrders() {
    const query = `
      SELECT 
        o.id,
        o.order_number,
        o.user_id,
        o.payment_method,
        o.subtotal,
        o.tax,
        o.total,
        o.status,
        o.snap_token,
        o.snap_redirect_url,
        o.create_at,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', od.id,
            'product_id', od.product_id,
            'product_name', p.name,
            'qty', od.qty,
            'price', od.price
          )
        ) AS items
      FROM orders o
      LEFT JOIN order_details od ON o.id = od.order_id
      LEFT JOIN products p ON od.product_id = p.id
      GROUP BY o.id
      ORDER BY o.create_at DESC
    `;
    const [rows] = await db.query(query);
    return rows;
  }

  static async findOrderById(order_id) {
    const query = `
      SELECT 
        o.id,
        o.order_number,
        o.user_id,
        o.payment_method,
        o.subtotal,
        o.tax,
        o.total,
        o.status,
        o.snap_token,
        o.snap_redirect_url,
        o.create_at,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', od.id,
            'product_id', od.product_id,
            'product_name', p.name,
            'qty', od.qty,
            'price', od.price
          )
        ) AS items
      FROM orders o
      LEFT JOIN order_details od ON o.id = od.order_id
      LEFT JOIN products p ON od.product_id = p.id
      WHERE o.id = ?
      GROUP BY o.id
    `;
    const [rows] = await db.query(query, [order_id]);
    return rows[0];
  }

  static async createOrder(connection, orderData) {
    const { order_number, user_id, payment_method, subtotal, tax, total, status = 'pending', snap_token, snap_redirect_url } = orderData;
    const query = `
      INSERT INTO orders (order_number, user_id, payment_method, subtotal, tax, total, status, snap_token, snap_redirect_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.query(query, [
      order_number,
      user_id,
      payment_method,
      subtotal,
      tax,
      total,
      status,
      snap_token,
      snap_redirect_url
    ]);
    return result.insertId;
  }

  static async updateOrderStatus(order_number, status) {
    const query = `UPDATE orders SET status = ? WHERE order_number = ?`;
    const [result] = await db.query(query, [status, order_number]);
    return result.affectedRows > 0;
  }

  static async restoreProductStock(order_number) {
    const query = `
      UPDATE products p
      JOIN order_details od ON p.id = od.product_id
      JOIN orders o ON od.order_id = o.id
      SET p.stock = p.stock + od.qty
      WHERE o.order_number = ?
    `;
    await db.query(query, [order_number]);
  }

  static async createOrderDetail(connection, detailData) {
    const { order_id, product_id, qty, price } = detailData;
    const query = `
      INSERT INTO order_details (order_id, product_id, qty, price)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await connection.query(query, [order_id, product_id, qty, price]);
    return result.insertId;
  }

  static async updateProductStock(connection, product_id, qty) {
    const query = `
      UPDATE products 
      SET stock = stock - ? 
      WHERE id = ? AND stock >= ? AND is_active = 1
    `;
    const [result] = await connection.query(query, [qty, product_id, qty]);
    return result.affectedRows > 0;
  }

  static async getProductById(product_id) {
    const query = `SELECT id, name, price, stock, is_active FROM products WHERE id = ? AND is_active = 1`;
    const [rows] = await db.query(query, [product_id]);
    return rows[0];
  }

  static async findOrderByOrderNumber(order_number) {
    const query = `SELECT * FROM orders WHERE order_number = ?`;
    const [rows] = await db.query(query, [order_number]);
    return rows[0];
  }
}

export default TransactionModel;