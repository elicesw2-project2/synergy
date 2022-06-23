import sql from './db';
import { CustomError } from '../middlewares/customError';

export interface DocumentInfo {
  nickname: string;
  title: string;
  content: string;
  user_idx: number;
  channel_idx: number;
}

export class DocumentModel {
  // 문서 목록 조회
  async findAll(channelIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM document WHERE channel_idx = ?',
        channelIdx,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      );
    });
  }

  // 문서 상세 조회
  async findById(documentIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM document WHERE document_idx = ?',
        documentIdx,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      );
    });
  }

  // 문서 카테고리 db에 등록
  async create(newDocument: DocumentInfo) {
    return new Promise((resolve, reject) => {
      sql.query('INSERT INTO document SET ?', newDocument, (err, res) => {
        return err
          ? reject(err)
          : resolve({
              document_idx: res.insertId,
              date: new Date(),
              ...newDocument,
            });
      });
    });
  }

  // document_idx 문서 수정
  async update(documentIdx: number, newDocument: DocumentInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'UPDATE document SET title = ?, content = ?, channel_idx = ? WHERE document_idx = ?',
        [
          newDocument.title,
          newDocument.content,
          newDocument.channel_idx,
          documentIdx,
        ],
        (err, res) => {
          console.log(res);
          console.log(res.affectedRows);
          if (res.affectedRows === 0) {
            return reject(
              new CustomError(404, '해당 문서 id를 찾을 수 없습니다.')
            );
          }
          return err
            ? reject(err)
            : resolve({
                document_idx: documentIdx,
                ...newDocument,
              });
        }
      );
    });
  }

  // document_idx로 문서 삭제
  async remove(documentIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'DELETE FROM document WHERE document_idx = ?',
        documentIdx,
        (err, res) => {
          if (res.affectedRows === 0) {
            return reject(
              new CustomError(404, '해당 문서 id를 찾을 수 없습니다.')
            );
          }
          return err ? reject(err) : resolve({ document_idx: documentIdx });
        }
      );
    });
  }
}

const documentModel = new DocumentModel();
export { documentModel };
