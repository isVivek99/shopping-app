import axios from 'axios';

//get token from local storage
const userDetails = localStorage.getItem('userDetails');
let authToken =
  localStorage.getItem('userDetails') === null
    ? ''
    : JSON.parse(userDetails as string)?.refreshToken;

//axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4011',
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authToken.length) {
    authToken =
      localStorage.getItem('userDetails') === null
        ? JSON.parse(userDetails as string)?.refreshToken
        : '';
    const dummyreq = { 'x-access-token': '' };
    req.headers
      ? req.headers['x-access-token']
      : (dummyreq['x-access-token'] = authToken);
    console.log('interceptor ran:', req);
  }
  authToken = '';
  return req;
});
export default axiosInstance;
