import express from 'express';
import getUsersByWorkspaceId from '../controllers/workspaceMember.controller';
import { loginRequired } from '../middlewares/login.required';

const router = express.Router();
//워크 스페이스 유저 목록 조회
router.get('/:user_idx', loginRequired, getUsersByWorkspaceId);
