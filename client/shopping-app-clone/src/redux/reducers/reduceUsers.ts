import types from 'redux/actionTypes';

interface UserLoggedIn {
  email: string;
  password: string;
}
interface UserLoggedInObject {
  userDetails: UserLoggedIn;
  userLoggedIn: boolean;
}

const defaultUserState: UserLoggedInObject = {
  userDetails: { email: '', password: '' },
  userLoggedIn: false,
};

const reduceUsers = (
  state = defaultUserState,
  action: { type: string; payload: UserLoggedIn }
) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      console.log(action.payload);
      return {
        userDetails: { ...action.payload },
        userLoggedIn: true,
      };

    case types.LOGOUT_USER:
      return {
        userDetails: {},
        userLoggedIn: false,
      };

    default:
      return state;
  }
};

export default reduceUsers;
