import sql from './db';

export interface ChannelInfo {
  name: string;
  type: string;
  category_idx: number;
}

export interface ChannelData {
  channel_idx: number;
  name: string;
  type: string;
  category_idx: number;
}

export class ChannelModel {
  // channelcategory_idx 별로 채널 목록 조회
  // eslint-disable-next-line class-methods-use-this
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
  // eslint-disable-next-line class-methods-use-this
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
  // eslint-disable-next-line class-methods-use-this
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
  // eslint-disable-next-line class-methods-use-this
  async update(channelIdx: number, newChannel: ChannelInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'UPDATE channel SET name = ? WHERE channel_idx = ?',
        [newChannel.name, channelIdx],
        (err, res) => {
          if (res.affectedRows === 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject({
              status: 404,
              message: '해당 채널카테고리 id를 찾을 수 없습니다.',
            });
          }
          return err
            ? reject(err)
            : resolve({
                channel_idx: channelIdx,
                ...newChannel,
              });
        }
      );
    });
  }

  // channel_idx로 채널 삭제
  // eslint-disable-next-line class-methods-use-this
  async remove(channelIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'DELETE FROM channel WHERE category_idx = ?',
        channelIdx,
        (err, res) => {
          if (res.affectedRows === 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject({
              status: 404,
              message: '해당 채널카테고리 id를 찾을 수 없습니다.',
            });
          }
          return err ? reject(err) : resolve({ channel_idx: channelIdx });
        }
      );
    });
  }
}

const channelModel = new ChannelModel();
export { channelModel };
