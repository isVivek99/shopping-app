import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { watcherSaga } from '../sagas/rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import types from 'redux/actionTypes';

console.log(types.LOGIN_USER);

interface User {
  id: number;
  fName: string;
  lName: string;
  email: string;
  password: string;
}

interface UserLoggedIn {
  email: string;
  password: string;
  error: '';
}
interface UserLoggedInObject {
  userVariable: UserLoggedIn;
}

const defaultUserState: UserLoggedInObject = {
  userVariable: { email: '', password: '', error: '' },
};

const reduceUsers = (
  state = defaultUserState || { email: '', password: '', error: '' },
  action: { type: string; payload: UserLoggedIn }
) => {
  switch (action.type) {
    case types.LOGIN_USER:
      console.log(action);
      return {
        userVariable: { ...action.payload },
      };

    case types.LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        userVariable: { ...action.payload },
      };

    default:
      return state;
  }
};

export default reduceUsers;
