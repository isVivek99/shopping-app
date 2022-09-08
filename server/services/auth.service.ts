import _ from 'lodash';
import { User, validateUser, validateLoginUser } from '../models';
import { responseObject } from '../helpers';

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

    //~ send response
    const encodedToken = newUser.generateToken();
    const data = {
      user: _.pick(newUser, ['_id', 'email']),
      encodedToken,
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
    const encodedToken = user.generateToken();
    const data = {
      user: _.pick(user, ['_id', 'email']),
      encodedToken,
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

export default {
  signUp,
  login,
};
