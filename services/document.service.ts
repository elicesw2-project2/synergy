/* eslint-disable no-shadow */
import {
  documentModel,
  DocumentModel,
  DocumentInfo,
} from '../model/document.model';
import { CustomError } from '../middlewares/customError';

class DocumentService {
  constructor(private documentModel: DocumentModel) {}

  // 채널별 문서 전체 목록 조회
  async findAllDocuments(channelIdx: number) {
    return await this.documentModel.findAll(channelIdx);
  }

  // 문서 상세 조회
  async findDocumentById(documentIdx: number) {
    return await this.documentModel.findById(documentIdx);
  }

  // 문서 등록
  async createDocument(user_idx: number, documentInfo: DocumentInfo) {
    const { nickname, title, channel_idx } = documentInfo;
    if (!nickname || !title || !channel_idx) {
      throw new CustomError(400, '요청값을 다시 확인해주세요.');
    }
    // db에 저장
    return await this.documentModel.create(user_idx, documentInfo);
  }

  // 문서 수정
  async updateDocument(documentIdx: number, documentInfo: DocumentInfo) {
    const { title, content, channel_idx } = documentInfo;
    if (!title || !content || !channel_idx) {
      throw new CustomError(400, '요청값을 다시 확인해주세요.');
    }
    return await this.documentModel.update(documentIdx, documentInfo);
  }

  // 문서 삭제
  async removeDocument(documentIdx: number) {
    return await this.documentModel.remove(documentIdx);
  }
}

const documentService = new DocumentService(documentModel);
export { documentService };
