import sql from './db';
import { CustomError } from '../middlewares/customError';

export interface ChannelCategoryInfo {
  name: string;
  workspace_idx: number;
}

export interface ChannelCategoryData {
  category_idx: number;
  name: string;
  workspace_idx: number;
}

export class ChannelCategoryModel {
  // workspace_idx로 채널 카테고리 목록 조회
  async findByWorkspace(workspaceIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM channelcategory WHERE workspace_idx = ?',
        workspaceIdx,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      );
    });
  }

  // 채널 카테고리 db에 등록
  async create(newChannelCategory: ChannelCategoryInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'INSERT INTO channelcategory SET ?',
        newChannelCategory,
        (err, res) => {
          return err
            ? reject(err)
            : resolve({ category_idx: res.insertId, ...newChannelCategory });
        }
      );
    });
  }

  // channel_idx로 채널 이름 수정
  async update(categoryIdx: number, newChannelCategory: ChannelCategoryInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'UPDATE channelcategory SET name = ? WHERE category_idx = ?',
        [newChannelCategory.name, categoryIdx],
        (err, res) => {
          if (res.affectedRows === 0) {
            return reject(
              new CustomError(404, '해당 채널카테고리 id를 찾을 수 없습니다.')
            );
          }
          return err
            ? reject(err)
            : resolve({
                category_idx: categoryIdx,
                ...newChannelCategory,
              });
        }
      );
    });
  }

  // channel_idx로 채널 삭제
  async remove(categoryIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'DELETE FROM channelcategory WHERE category_idx = ?',
        categoryIdx,
        (err, res) => {
          if (res.affectedRows === 0) {
            return reject(
              new CustomError(404, '해당 채널카테고리 id를 찾을 수 없습니다.')
            );
          }
          return err ? reject(err) : resolve({ category_idx: categoryIdx });
        }
      );
    });
  }
}

const channelCategoryModel = new ChannelCategoryModel();
export { channelCategoryModel };
