import express from 'express';

import { logInUser, signupUser } from '../controllers';
const router = express.Router();
router.post('/signup', signupUser);
router.post('/login', logInUser);

export default router;
