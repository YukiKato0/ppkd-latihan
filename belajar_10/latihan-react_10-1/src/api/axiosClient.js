import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menangani token atau error global kedepannya
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = error.response?.data || error.message;
    return Promise.reject(customError);
  }
);

export default axiosClient;