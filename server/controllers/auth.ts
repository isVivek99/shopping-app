import { Request, Response } from 'express';
import { ResponseWrapper, responseObject } from '../helpers';

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { fName, lName, email, password } = req.body;

    if (!(email && password && fName && lName)) {
      return res.status(400).send('All inputs are required');
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    // add user to DB
    const user = await User.create({
      fName: fName,
      lName: lName,
      email: email.toLowerCase(), //sanitize: convert email to lowercase
      password: password,
    });

    // Create token
    const token = jwt.sign(
      {
        fName: fName,
        email: email,
        expiresIn: new Date().getTime() + 360000,
      },
      process.env.JWT_SECRET
    );
    let refreshToken = await RefreshToken.createToken(user);

    const newUserInstance = {
      fName: fName,
      lName: lName,
      email: email,
      accessToken: token,
      refreshToken,
    };
    return res.json({ status: 201, user: newUserInstance });

    //catch error
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: error.message });
  }
};
