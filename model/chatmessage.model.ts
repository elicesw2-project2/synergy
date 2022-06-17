import sql from './db';

export interface ChatMessageData {
  message_idx: number;
  message: string;
  user_idx: number;
  room_idx: number;
  create_time: Date;
}

export interface ChatMessageInfo {
  message: string;
  room_idx: number;
  user_idx: number;
}

export interface ToUpdate {
  message_idx: number;
  message: string;
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

  async create(ChatMessageInfo: ChatMessageInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'INSERT INTO chatmessage set ?',
        ChatMessageInfo,
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
}
const chatmessageModel = new ChatMessageModel();
export { chatmessageModel };
