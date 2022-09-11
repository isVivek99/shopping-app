import axios from 'axios';

//axios instance
const axiosInstance = axios.create({
  baseURL: 'https://shopping-app-beryl.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
