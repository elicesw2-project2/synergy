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
  async getAllChatMessageByRoom(
    room_idx: number,
    result: (err: Error | null, data: ChatMessageData[] | null) => void
  ) {
    await sql.query(
      'SELECT * FROM chatmessage where room_idx = ?',
      room_idx,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, res);
      }
    );
  }

  async addChatMessage(
    ChatMessageInfo: ChatMessageInfo,
    result: (err: Error | null, data: ChatMessageData | null) => void
  ) {
    await sql.query(
      'INSERT INTO chatmessage set ?',
      ChatMessageInfo,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, {
          message_idx: res.insertId,
          create_time: new Date(),
          ...ChatMessageInfo,
        });
      }
    );
  }
}
const chatmessageModel = new ChatMessageModel();
export { chatmessageModel };
