import _ from 'lodash';
import {
  User,
  validateUser,
  validateLoginUser,
  validateForgotPasswordUser,
  RefreshToken,
} from '../models';
import { responseObject, sendForgotPasswordEmail } from '../helpers';

interface credProps {
  fName: string;
  lName: string;
  email: string;
  password: string;
}
interface loginCredProps {
  email: string;
  password: string;
}
interface forgotPasswordCredProps {
  email: string;
}
interface refreshTokenCredProps {
  refreshToken: string;
}

const signUp = async ({
  fName,
  lName,
  email,
  password,
}: credProps): Promise<responseObject> => {
  try {
    //~ Validate the request body
    const { error } = validateUser({
      email: email,
      password: password,
      fName: fName,
      lName: lName,
    });

    if (error) throw { status: 400, message: error.details[0].message };

    //~ Check if user already exists
    const user = await User.findOne({ email: email });
    if (user) throw { status: 400, message: 'User already exists.' };

    //~ Create a new user
    const newUser = new User({
      email: email,
      password: password,
      fName: fName,
      lName: lName,
    });
    newUser.password = newUser.generateHash();

    //~ Save the new user
    await newUser.save();

    //~ create tokens
    const idToken = newUser.generateToken('900s');

    //~ create a new refresh token
    let refreshToken = await RefreshToken.createToken(newUser);
    refreshToken = refreshToken.token;
    //~ send response
    const data = {
      user: _.pick(newUser, ['_id', 'email', 'fName']),
      idToken,
      refreshToken,
    };

    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const login = async ({ email, password }: loginCredProps) => {
  try {
    //~ Validate the request body
    const { error } = validateLoginUser({ email: email, password: password });
    if (error) throw { status: 400, message: error.details[0].message };

    //~ Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) throw { status: 400, message: 'Invalid email or password.' };

    //~ Check if password is correct
    const validPassword = user.validatePassword(password);
    if (!validPassword)
      throw { status: 400, message: 'Invalid email or password.' };

    //~ Send response
    const idToken = user.generateToken('900s');
    //~ create a new refresh token
    let refreshToken = await RefreshToken.createToken(user);
    refreshToken = refreshToken.token;

    const data = {
      user: _.pick(user, ['_id', 'email', 'fName']),
      idToken,
      refreshToken,
    };
    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const forgotPassword = async ({ email }: forgotPasswordCredProps) => {
  try {
    //~ Validate the request body
    const { error } = validateForgotPasswordUser({ email: email });
    if (error) throw { status: 400, message: error.details[0].message };

    //~ Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) throw { status: 400, message: 'Cannot find user.' };

    //user exist, create a one time link for 15 mins
    sendForgotPasswordEmail(email, user.generateLink());

    return {
      success: true,
      data: { message: 'reset password link is sent to your email.' },
    };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const refreshToken = async ({ refreshToken }: refreshTokenCredProps) => {
  try {
    //~ Check if token exists
    const userRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
    });
    if (!userRefreshToken) throw { status: 401, message: 'Invalid token.' };

    return {
      success: true,
      data: {},
    };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

export default {
  signUp,
  login,
  forgotPassword,
  refreshToken,
};
