import db from '../../config/db.js'

const CategoryModel = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  },

  async create(categoryData) {
    const { name } = categoryData;
    const [result] = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );
    return result.insertId;
  },

  async update(id, categoryData) {
    const { name } = categoryData;
    const [result] = await db.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

export default CategoryModel;