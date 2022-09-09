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
    const user = data.data.user;
    const idToken = data.data.idToken;
    const refreshToken = data.data.refreshToken;

    if (data.success) {
      const payload = {
        fName: user.fName,
        email: user.email,
        idToken: idToken,
        refreshToken: refreshToken,
      };
      yield put({
        type: types.LOGIN_USER_SUCCESS,
        payload: payload,
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
  } catch (error) {
    console.log(error);
    yield put({
      type: types.SET_TOAST,
      payload: {
        message: `${error.response.data.data.message}`,
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
    const data: any = { ...response.data };
    const user = data.data.user;
    const idToken = data.data.idToken;
    const refreshToken = data.data.refreshToken;
    // console.log(data, data.data);

    if (data.success) {
      const payload = {
        fName: user.fName,
        email: user.email,
        idToken: idToken,
        refreshToken: refreshToken,
      };

      yield put({
        type: types.LOGIN_USER_SUCCESS,
        payload: payload,
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
