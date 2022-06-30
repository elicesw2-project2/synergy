import { Request, Response, NextFunction } from 'express';
import { documentService } from '../services/document.service';

class DocumentController {
  // 채널별 문서 목록 조회
  async getAllDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const documents = await documentService.findAllDocuments(
        Number(req.params.channel_idx)
      );
      res.status(200).send({
        status: 200,
        message: '채널별 문서 목록 조회 성공',
        data: documents,
      });
    } catch (err) {
      next(err);
    }
  }

  // 문서 개별 조회
  async getDocumentById(req: Request, res: Response, next: NextFunction) {
    try {
      const document = await documentService.findDocumentById(
        Number(req.params.document_idx)
      );
      res.status(200).send({
        status: 200,
        message: '문서 상세 조회 성공',
        data: document,
      });
    } catch (err) {
      next(err);
    }
  }

  // 문서 등록
  async addDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const user_idx: number = Number(req.currentUserIdx);
      const document = await documentService.createDocument(user_idx, req.body);
      res.status(201).send({
        status: 201,
        message: '문서 등록 성공',
        data: document,
      });
    } catch (err) {
      next(err);
    }
  }

  // 문서 수정
  async setDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const document = await documentService.updateDocument(
        Number(req.params.document_idx),
        req.body
      );
      res.status(200).send({
        status: 200,
        message: '문서 수정 성공',
        data: document,
      });
    } catch (err) {
      next(err);
    }
  }

  // 문서 삭제
  async deleteDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const document = await documentService.removeDocument(
        Number(req.params.document_idx)
      );
      res.status(200).send({
        status: 200,
        message: '문서 삭제 성공',
        data: document,
      });
    } catch (err) {
      next(err);
    }
  }
}

const documentController = new DocumentController();
export { documentController };
