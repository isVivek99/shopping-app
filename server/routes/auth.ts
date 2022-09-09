import express from 'express';

import {
  logInUser,
  signupUser,
  forgotPassword,
  refreshToken,
} from '../controllers';
const router = express.Router();
router.post('/signup', signupUser);
router.post('/login', logInUser);
router.post('/forgotpassword', forgotPassword);
router.post('/refreshtoken', refreshToken);

export default router;
