import { Router } from 'express';
import { loginRequired } from '../middlewares/login.required';
import * as userController from '../controllers/user.controller';

const router = Router();

// 유저 정보 조회
router.get('/:id', loginRequired, userController.getUserById);

// 유저 정보 수정
router.patch('/:id', loginRequired, userController.setUser);

// 유저 정보 삭제 (회원탈퇴)
router.delete('/:id', loginRequired, userController.deleteUser);
export default router;
