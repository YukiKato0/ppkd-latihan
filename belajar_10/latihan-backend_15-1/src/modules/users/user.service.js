import UserModel from './user.model.js'

const UserService = {
  async getAllUsers() {
    return await UserModel.findAll();
  },

  async getUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error('User tidak ditemukan');
    }
    return user;
  },

  async createUser(data) {
    if (!data.name || !data.email || !data.password) {
      throw new Error('Name, email, dan password wajib diisi');
    }
    const userId = await UserModel.create(data);
    return await UserModel.findById(userId);
  },

  async updateUser(id, data) {
    await UserService.getUserById(id);
    await UserModel.update(id, data);
    return await UserModel.findById(id);
  },

  async deleteUser(id) {
    await UserService.getUserById(id);
    return await UserModel.delete(id);
  }
};

export default UserService;