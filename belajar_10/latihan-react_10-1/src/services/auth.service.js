import axiosClient from '../api/axiosClient';

export const authService = {
  async loginUser(userData) {
    const response = await axiosClient.post('/auth/login', userData)
    return response
  }
}