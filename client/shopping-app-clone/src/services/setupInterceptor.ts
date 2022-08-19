import axios from 'axios';
import axiosInstance from './api';
import { logoutUser, setToast } from 'actions';
import TokenService from './Authservice';
import jwtDecode from 'jwt-decode';
//get token from local storage

const setup = (store: any) => {
  const { dispatch } = store;
  axiosInstance.interceptors.request.use(
    async (req) => {
      const userDetails = localStorage.getItem('userDetails');
      const accessTokenExpireTime =
        localStorage.getItem('userDetails') === null
          ? ''
          : JSON.parse(userDetails as string)?.expiresIn;

      console.log(
        accessTokenExpireTime,
        accessTokenExpireTime - new Date().getTime()
      );
      const isExpired = accessTokenExpireTime < new Date().getTime();
      console.log(isExpired);

      if (!isExpired) return req;
      try {
        const response = await axios.post(
          'http://localhost:4011/api/refreshtoken',
          {
            refreshToken: JSON.parse(userDetails as string).refreshToken,
          }
        );
        console.log(response.data, jwtDecode(response.data.accessToken));
        TokenService.updateUserAccessToken(response.data.accessToken);
        const dummyreq = { 'x-access-token': '' };
        req.headers
          ? req.headers['x-access-token']
          : (dummyreq['x-access-token'] = response.data.accessToken);
        return req;
      } catch (error) {
        console.log(error.message);

        dispatch(logoutUser());
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setup;
