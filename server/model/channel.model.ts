import sql from './db';
import { CustomError } from '../middlewares/customError';

export interface ChannelInfo {
  name: string;
  type: number;
  category_idx: number;
}

export interface ChannelData {
  channel_idx: number;
  name: string;
  type: number;
  category_idx: number;
}

export class ChannelModel {
  // channelcategory_idx 별로 채널 목록 조회
  async findByChannel(categoryIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM channel WHERE category_idx = ?',
        categoryIdx,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      );
    });
  }

  // 채널 상세 조회
  async findById(channelIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM channel WHERE channel_idx = ?',
        channelIdx,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      );
    });
  }

  // 채널 카테고리 db에 등록
  async create(newChannel: ChannelInfo) {
    return new Promise((resolve, reject) => {
      sql.query('INSERT INTO channel SET ?', newChannel, (err, res) => {
        return err
          ? reject(err)
          : resolve({ channel_idx: res.insertId, ...newChannel });
      });
    });
  }

  // channel_idx로 채널 이름 수정
  async update(channelIdx: number, newChannel: ChannelInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'UPDATE channel SET name = ? WHERE channel_idx = ?',
        [newChannel.name, channelIdx],
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            if (res.affectedRows === 0) {
              return reject(
                new CustomError(404, '해당 채널 id를 찾을 수 없습니다.')
              );
            }
            return resolve({ channel_idx: channelIdx, ...newChannel });
          }
        }
      );
    });
  }

  // channel_idx로 채널 삭제
  async remove(channelIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'DELETE FROM channel WHERE channel_idx = ?',
        channelIdx,
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            if (res.affectedRows === 0) {
              return reject(
                new CustomError(404, '해당 채널카테고리 id를 찾을 수 없습니다.')
              );
            }
            return resolve({ channel_idx: channelIdx });
          }
        }
      );
    });
  }
}

const channelModel = new ChannelModel();
export { channelModel };
