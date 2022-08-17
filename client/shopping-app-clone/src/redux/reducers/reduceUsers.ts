import types from 'redux/actionTypes';
import { removeUserInLocalStorage } from 'services/Authservice';

interface UserLoggedIn {
  email: string;
  password: string;
  token: string;
}
interface UserLoggedInObject {
  userDetails: UserLoggedIn;
  token?: string;
  userLoggedIn: boolean;
}

const defaultUserState: UserLoggedInObject = {
  userDetails: { email: '', password: '', token: '' },
  userLoggedIn: false,
};

const reduceUsers = (
  state = defaultUserState,
  action: { type: string; payload: UserLoggedIn }
) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return {
        userDetails: { ...action.payload },
        token: action.payload.token,
        userLoggedIn: true,
      };

    case types.LOGOUT_USER:
      removeUserInLocalStorage();
      return {
        userDetails: {},
        token: '',
        userLoggedIn: false,
      };

    case types.REFRESH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};

export default reduceUsers;
