import express from 'express';

import { logInUser, signupUser, forgotPassword } from '../controllers';
const router = express.Router();
router.post('/signup', signupUser);
router.post('/login', logInUser);
router.post('/forgotpassword', forgotPassword);
router.post('/refreshtoken', forgotPassword);

export default router;
