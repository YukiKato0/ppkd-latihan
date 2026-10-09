import UserService from './user.service.js'

const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      const status = error.message === 'User tidak ditemukan' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      const status = error.message === 'User tidak ditemukan' ? 404 : 400;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(200).json({ success: true, message: 'User berhasil dihapus' });
    } catch (error) {
      const status = error.message === 'User tidak ditemukan' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  }
};

export default UserController;