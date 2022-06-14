import express from 'express';
import signup from '../controllers/auth.controller';
// import isAuth from '../models/auth.model.js';
// import * as validator from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
// router.post('/login', validator.validateCredential, authController.login);
// router.get('/me', isAuth, authController.me);
export default router;
