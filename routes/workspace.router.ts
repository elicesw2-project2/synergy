import express from 'express';
import bodyParser from 'body-parser';
import * as workspaceController from '../controllers/workspace.controller';

const parser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

// 전체 워크스페이스 목록 조회
router.get('/', workspaceController.getAll);

// 워크 스페이스 id로 상세 조회
router.get('/:workspace_idx', workspaceController.getById);

// 워크스페이스 등록
router.post('/', parser, workspaceController.create);

// 워크스페이스 정보 수정
router.patch('/:workspace_idx', parser, workspaceController.update);

// 워크스페이스 삭제
router.delete('/:workspace_idx', workspaceController.remove);

export default router;
