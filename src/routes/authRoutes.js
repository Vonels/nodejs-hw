import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const router = Router();

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

router.post(
  '/request-reset-email',
  celebrate({
    [Segments.BODY]: requestResetEmailSchema,
  }),
  requestResetEmail,
);

// RESET PASSWORD
router.post(
  '/reset-password',
  celebrate({
    [Segments.BODY]: resetPasswordSchema,
  }),
  resetPassword,
);

export default router;
