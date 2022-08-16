import types from 'redux/actionTypes';

interface UserLoggedIn {
  email: string;
  password: string;
  accesstoken: string;
}
interface UserLoggedInObject {
  userDetails: UserLoggedIn;
  token?: string;
  userLoggedIn: boolean;
}

const defaultUserState: UserLoggedInObject = {
  userDetails: { email: '', password: '', accesstoken: '' },
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
        token: action.payload.accesstoken,
        userLoggedIn: true,
      };

    case types.LOGOUT_USER:
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
