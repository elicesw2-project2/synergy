import express from 'express';
import workspaceController from '../controllers/workspace.controller';

const router = express.Router();

// 전체 워크스페이스 조회
router.get('/');

// 워크 스페이스 id로 상세 조회
router.get('/:workspace_idx');

// 워크스페이스 등록
router.post('/');

// 워크스페이스 정보 수정
router.patch('/:workspace_idx');

// 워크스페이스 삭제
router.delete('/:workspace_idx');

export default router;
