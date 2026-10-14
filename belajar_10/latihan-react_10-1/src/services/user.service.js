import axiosClient from '../api/axiosClient';

export const userService = {
  async getAllUsers() {
    const response = await axiosClient.get('/user');

    if (Array.isArray(response)) return response;
    if (response && Array.isArray(response.users)) return response.users;
    if (response && Array.isArray(response.data)) return response.data;

    return [];
  },
  async createUser(userData) {
    return await axiosClient.post('/user', userData);
  },
  async updateUser(id, userData) {
    return await axiosClient.put(`/user/${id}`, userData);
  },
  async deleteUser(id) {
    return await axiosClient.delete(`/user/${id}`);
  },
};