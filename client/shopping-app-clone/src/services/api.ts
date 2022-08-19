import axios from 'axios';

//axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4011/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
