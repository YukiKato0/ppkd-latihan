import db from '../../config/db.js'

const ProductModel = {
  async findAll() {
    const [rows] = await db.query('SELECT products.*, categories.name AS name_category FROM products LEFT JOIN categories ON products.category_id = categories.id');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  async create(productData) {
    const { name, description, price, stock, category_id } = productData;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, stock, category_id]
    );
    return result.insertId;
  },

  async update(id, productData) {
    const { name, description, price, stock, category_id } = productData;
    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?',
      [name, description, price, stock, category_id, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

export default ProductModel;