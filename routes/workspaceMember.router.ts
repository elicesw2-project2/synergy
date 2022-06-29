import express from 'express';
import * as workspaceMemberController from '../controllers/workspaceMember.controller';

const router = express.Router();

//워크 스페이스 유저 목록 조회
router.get('/:workspace_idx', workspaceMemberController.getAllUser);

//워크 스페이스 유저 추가
router.post('/', workspaceMemberController.addMember);
