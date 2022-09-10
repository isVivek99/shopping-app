import { Request, Response } from 'express';
import { ResponseWrapper, responseObject } from '../helpers/ResponseWrapper';
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

//forgot-password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const result: responseObject = await authService.forgotPassword({ email });
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};

//refreshtoken
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  console.log(refreshToken);

  const result: responseObject = await authService.refreshToken({
    refreshToken,
  });
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.unauthorized(result);
};
