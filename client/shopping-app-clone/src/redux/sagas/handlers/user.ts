import types from 'redux/actionTypes';
import { call, put, delay } from 'redux-saga/effects';
import { requestGetUser, requestAddUser } from 'redux/sagas/requests/user';
import jwt from 'jwt-decode';
import { saveUserInLocalStorage } from 'services/Authservice';

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

    if (data.user) {
      const user: {
        fName: string;
        email: string;
        token: string;
        refreshToken: string;
      } = data.user;
      const JWTDestructured: { expiresIn: string } = jwt(user.token);
      const userExpireTimeInMilliSec =
        parseInt(JWTDestructured.expiresIn) * 1000;
      console.log(jwt(data.user.token), user);

      saveUserInLocalStorage({
        ...jwt(user.token),
        refreshToken: user.refreshToken,
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

      yield delay(userExpireTimeInMilliSec);
      yield put({
        type: types.LOGOUT_USER,
        payload: {},
      });
      yield put({
        type: types.SET_TOAST,
        payload: {
          message: ` ${user.fName}, logged out !!`,
          variant: 'success',
          position: 'top-right',
          show: true,
          id: Math.floor(Math.random() * 100),
        },
      });
    }
  } catch (error) {
    console.log(error);
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
      token: string;
      refreshToken: string;
    } = data.user;
    console.log(data, user, jwt(user.token));

    if (user) {
      const JWTDestructured: { expiresIn: string } = jwt(user.token);
      const userExpireTimeInMilliSec =
        parseInt(JWTDestructured.expiresIn) * 1000;

      saveUserInLocalStorage({
        ...jwt(user.token),
        refreshToken: user.refreshToken,
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
      yield delay(userExpireTimeInMilliSec);
      yield put({
        type: types.LOGOUT_USER,
        payload: {},
      });
      yield put({
        type: types.SET_TOAST,
        payload: {
          message: ` ${user.fName}, logged out !!`,
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
