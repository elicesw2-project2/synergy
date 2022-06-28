import express from 'express';
import bodyParser from 'body-parser';
import * as workspaceController from '../controllers/workspace.controller';
import { loginRequired } from '../middlewares/login.required';

const parser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

// 전체 워크스페이스 목록 조회
router.get('/', workspaceController.getAllWorkspaces);

// 워크 스페이스 id로 상세 조회
router.get('/:workspace_idx', workspaceController.getWorkspaceById);

// 워크스페이스 등록
router.post('/', parser, workspaceController.addWorkspace);

// 워크스페이스 정보 수정
router.patch('/:workspace_idx', parser, workspaceController.setWorkspace);

// 워크스페이스 삭제
router.delete('/:workspace_idx', workspaceController.deleteWorkspace);

export default router;

// 목록 조회는 token을 받아서 해당 id가 속한 모든 워크스페이스를 조회하는 것임
// 등록 res 값 수정
// index.ts로 router들 연결하기
