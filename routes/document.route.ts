import { Router } from 'express';
import { documentController } from '../controllers/document.controller';
import { loginRequired } from '../middlewares/login.required';

const router = Router();

// 채널별 문서 목록 조회 (/documents/channel/:channel_idx)
router.get(
  '/channel/:channel_idx',
  loginRequired,
  documentController.getAllDocument
);

// 문서 상세 조회 (/documents/:document_idx)
router.get('/:document_idx', loginRequired, documentController.getDocumentById);

// 문서 등록 (/documents)
router.post('/', loginRequired, documentController.addDocument);

// 문서 수정 (/documents/:document_idx)
router.patch('/:document_idx', documentController.setDocument);

// 문서 삭제 (/documents/:document_idx)
router.delete('/:document_idx', documentController.deleteDocument);

export default router;
