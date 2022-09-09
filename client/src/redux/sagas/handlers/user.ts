import types from 'redux/actionTypes';
import { call, put, delay } from 'redux-saga/effects';
import { requestGetUser, requestAddUser } from 'redux/sagas/requests/user';
import jwt from 'jwt-decode';
import TokenService from 'services/Authservice';

interface UserInfoArray {
  config: object;
  data: Array<object>;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}

interface UserPayload {
  email: string;
  name: string;
  password: string;
}
interface ActionType {
  type: string;
  payload: UserPayload;
}

interface userLoginResponse {
  data: any;
}

//worker saga

export function* handleLoginUser(action: ActionType) {
  try {
    const response: UserInfoArray = yield call(requestGetUser, action.payload);
    const data: any = { ...response.data };
    console.log(data, data.data);

    if (data.success) {
      const user: {
        fName: string;
        email: string;
        accessToken: string;
        refreshToken: string;
      } = data.user;

      TokenService.saveUserInLocalStorage({
        ...jwt(user.accessToken),
        refreshToken: data.data.refreshToken,
        accessToken: user.accessToken,
      });
      console.log(jwt(data.data.encodedToken), jwt(data.data.refreshToken));
      const payload = {
        fName: data.data.user.fName,
        email: data.data.user.email,
        accessToken: data.data.encodedToken,
        refreshToken: data.data.refreshToken,
      };
      yield put({
        type: types.LOGIN_USER_SUCCESS,
        payload: payload,
      });
      yield put({
        type: types.SET_TOAST,
        payload: {
          message: `hi ${data.data.user.fName}, you are logged In !!`,
          variant: 'success',
          position: 'top-right',
          show: true,
          id: Math.floor(Math.random() * 100),
        },
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.SET_TOAST,
      payload: {
        message: `${error.response.data.message}`,
        variant: 'error',
        position: 'top-right',
        show: true,
        id: Math.floor(Math.random() * 100),
      },
    });
  }
}

export function* handleAddUser(action: ActionType) {
  try {
    const response: userLoginResponse = yield call(
      requestAddUser,
      action.payload
    );
    const data = { ...response.data };
    const user: {
      fName: string;
      email: string;
      accessToken: string;
      refreshToken: string;
    } = data.user;
    console.log(data, user, jwt(user.accessToken));

    if (user) {
      TokenService.saveUserInLocalStorage({
        ...jwt(user.accessToken),
        refreshToken: user.refreshToken,
        accessToken: user.accessToken,
      });
      yield put({
        type: types.LOGIN_USER_SUCCESS,
        payload: user,
      });
      yield put({
        type: types.SET_TOAST,
        payload: {
          message: `hi ${user.fName}, you are logged In !!`,
          variant: 'success',
          position: 'top-right',
          show: true,
          id: Math.floor(Math.random() * 100),
        },
      });
    }

    console.log(jwt(data.user));
    if (data.status === 'error') {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}
