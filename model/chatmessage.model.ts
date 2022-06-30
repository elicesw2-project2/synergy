import { CustomError } from '../middlewares/customError';
import sql from './db';

export interface ChatMessageData {
  message_idx: number;
  message: string;
  user_idx: number;
  room_idx: number;
  create_time: Date;
  nickname: string;
}

export interface ChatMessageInfo {
  message: string;
  room_idx: number;
  user_idx: number;
  nickname: string;
}

export interface ToUpdate {
  message_idx: number;
  message: string;
  nickname: string;
}

export class ChatMessageModel {
  // eslint-disable-next-line class-methods-use-this
  async findAllByRoomId(room_idx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM chatmessage where room_idx = ?',
        room_idx,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      );
    });
  }

  async findUseridxByMessageId(message_idx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT user_idx FROM chatmessage where message_idx = ?',
        message_idx,
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            if (res.length === 0) {
              return reject(
                new CustomError(404, '해당 user_idx를 찾을 수 없습니다.')
              );
            }
            return resolve(res[0].user_idx);
          }
        }
      );
    });
  }

  async create(user_idx: number, ChatMessageInfo: ChatMessageInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'INSERT INTO chatmessage (message,user_idx,room_idx,nickname) values (?,?,?,?)',
        [
          ChatMessageInfo.message,
          user_idx,
          ChatMessageInfo.room_idx,
          ChatMessageInfo.nickname,
        ],
        (err, res) => {
          return err
            ? reject(err)
            : resolve({
                message_idx: res.insertId,
                create_time: new Date(),
                ...ChatMessageInfo,
              });
        }
      );
    });
  }

  async update(message_idx: number, ChatMessageInfo: ChatMessageInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'UPDATE chatmessage set message = ? where message_idx = ?',
        [ChatMessageInfo.message, message_idx, ChatMessageInfo.message],
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            if (res.affectedRows === 0) {
              // eslint-disable-next-line prefer-promise-reject-errors
              return reject(
                new CustomError(404, '해당 message_idx를 찾을 수 없습니다.')
              );
            }
            return resolve({ message_idx: message_idx, ...ChatMessageInfo });
          }
        }
      );
    });
  }

  async remove(message_idx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'DELETE FROM chatmessage where message_idx = ?',
        message_idx,
        (err, res) => {
          if (res.affectedRows === 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject({
              status: 404,
              message: '해당 message_idx를 찾을 수 없습니다.',
            });
          }

          return err ? reject(err) : resolve({ message_idx: message_idx });
        }
      );
    });
  }
}
const chatmessageModel = new ChatMessageModel();
export { chatmessageModel };
