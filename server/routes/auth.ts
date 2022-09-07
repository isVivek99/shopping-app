import express from 'express';

const router = express.Router();

import { signUpUser, logInUser } from '../controllers';

router.post('/signup', signUpUser);
router.post('/login', logInUser);

export default router;
