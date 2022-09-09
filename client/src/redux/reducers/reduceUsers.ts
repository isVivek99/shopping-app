import types from 'redux/actionTypes';
import TokenService from 'services/Authservice';

interface UserLoggedIn {
  email: string;
  fName: string;
  idToken: string;
  refreshToken: string;
}
interface UserLoggedInObject {
  userDetails: UserLoggedIn;
  token?: string;
  userLoggedIn: boolean;
}

const defaultUserState: UserLoggedInObject = {
  userDetails: { email: '', fName: '', idToken: '', refreshToken: '' },
  userLoggedIn: false,
};

const reduceUsers = (
  state = defaultUserState,
  action: { type: string; payload: UserLoggedIn }
) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return {
        userDetails: {
          email: action.payload.email,
          fName: action.payload.fName,
        },
        idToken: action.payload.idToken,
        refreshToken: action.payload.refreshToken,
        userLoggedIn: true,
      };

    case types.LOGOUT_USER:
      TokenService.removeUserInLocalStorage();
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
