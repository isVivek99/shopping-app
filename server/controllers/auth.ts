import { Request, Response } from 'express';
import { ResponseWrapper, responseObject } from '../helpers';
import authService from '../services/auth.service';

//signup-user
export const signupUser = async (req: Request, res: Response) => {
  const { email, password, fName, lName } = req.body;
  console.log(req.body);

  const result: responseObject = await authService.signUp({
    email,
    password,
    fName,
    lName,
  });
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.created(result);
};

//login-user
export const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result: responseObject = await authService.login({ email, password });
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};
