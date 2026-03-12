import express from 'express';
import {
  registerUser,
  loginUser,
  refreshUsersSession,
  logoutUser,
} from '../controllers/authController.js';

import { validateBody } from '../middleware/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const router = express.Router();

router.post('/register', validateBody(registerUserSchema), registerUser);

router.post('/login', validateBody(loginUserSchema), loginUser);

router.post('/refresh', refreshUsersSession);

router.post('/logout', logoutUser);

export default router;
