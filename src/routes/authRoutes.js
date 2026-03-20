import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import {
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post('/request-reset-email', requestResetEmail);
router.post('/reset-password', resetPassword);

router.post(
  '/register',
  celebrate({
    [Segments.BODY]: registerUserSchema,
  }),
  registerUser,
);

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: loginUserSchema,
  }),
  loginUser,
);

router.post('/refresh', refreshUserSession);
router.post('/logout', logoutUser);

export default router;
