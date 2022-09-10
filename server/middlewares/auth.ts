import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface IDecode {
  fname: string;
  email: string;
}

interface RequestWithUserRole extends Request {
  user?: IDecode;
}

const auth = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  const token = req?.header('authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = <IDecode>jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

export { auth };
