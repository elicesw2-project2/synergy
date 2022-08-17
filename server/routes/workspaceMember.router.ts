import express from 'express';
import * as workspaceMemberController from '../controllers/workspaceMember.controller';
import { loginRequired } from '../middlewares/login.required';

const router = express.Router();

//워크 스페이스 유저 목록 조회
router.get('/:workspace_idx', workspaceMemberController.getAllUser);

//워크 스페이스 유저 추가
router.post('/', loginRequired, workspaceMemberController.addMember);

//워크 스페이스 유저 삭제
router.delete('/', loginRequired, workspaceMemberController.deleteMember);
// 워크 스페이스 유저 권한 확인
router.get('/', loginRequired, workspaceMemberController.getUserRole);
export default router;
