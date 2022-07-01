import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import * as validator from '../middlewares/authValidator';

const router = Router();

router.post('/signup', validator.validateSignup, authController.signup);
router.post('/login', validator.validateLogin, authController.login);
export default router;
