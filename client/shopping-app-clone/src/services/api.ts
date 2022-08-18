import axios from 'axios';

//get token from local storage
const userDetails = localStorage.getItem('userDetails');
const authToken =
  localStorage.getItem('userDetails') === null
    ? {}
    : JSON.parse(userDetails as string).refreshToken;

//axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4011/api',
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});
export default axiosInstance;
