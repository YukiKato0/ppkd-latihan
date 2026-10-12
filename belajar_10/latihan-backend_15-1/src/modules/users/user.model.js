import db from '../../config/db.js'

const UserModel = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async create(userData) {
    const { name, email, password, is_active } = userData;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, is_active) VALUES (?, ?, ?, ?)',
      [name, email, password, is_active ?? 1]
    );
    return result.insertId;
  },

  async update(id, userData) {
    const { name, email, password, is_active } = userData;
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, password = ?, is_active = ? WHERE id = ?',
      [name, email, password, is_active ?? 1, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

export default UserModel;