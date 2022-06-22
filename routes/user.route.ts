import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

// 유저 정보 조회
router.get('/:id', userController.getUserById);

// 유저 정보 수정
router.patch('/:id', userController.setUser);

// 유저 정보 삭제 (회원탈퇴)
router.delete('/:id', userController.deleteUser);
export default router;
