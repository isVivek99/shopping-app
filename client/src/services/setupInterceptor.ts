import axios from 'axios';
import axiosInstance from './api';
import { logoutUser, setToast } from 'actions';
import jwtDecode from 'jwt-decode';

//get token from local storage
interface userDetails {
  _id: string;
  email: string;
  iat: number;
  exp: number;
}

const setup = (store: any) => {
  const { dispatch } = store;
  let userDetails: userDetails;
  let refreshToken: string;
  const updateTokens = () => {
    const state = store?.getState();
    userDetails = state.reduceUsers?.idToken
      ? jwtDecode(state.reduceUsers?.idToken)
      : { _id: '', email: '', iat: 1, exp: 1 };
    refreshToken = state.reduceUsers?.refreshToken;
    console.log(userDetails, refreshToken);
  };
  store.subscribe(updateTokens);
  axiosInstance.interceptors.request.use(
    async (req) => {
      const idTokenExpireTime = userDetails.exp * 1000;
      const isExpired = idTokenExpireTime < new Date().getTime();
      console.log(isExpired);
      if (!isExpired) return req;
      try {
        const response = await axios.post(
          'https://shopping-app-beryl.vercel.app/api/auth/refreshtoken',
          {
            refreshToken,
          }
        );

        const dummyreq = { authorization: '' };
        req.headers
          ? (req.headers['authorization'] = response.data.idToken)
          : (dummyreq['authorization'] = response.data.idToken);
        console.log('here:', req.headers);

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
