import sql from './db';

export interface ChatMessageInfo {
  message: string;
  user_idx: number;
  room_idx: number;
}

export interface ToCreate {
  message: string;
  room_idx: number;
}

export interface ToUpdate {
  message_idx: number;
  message: string;
}

export class ChatMessageModel {
  // eslint-disable-next-line class-methods-use-this
  async getAllChatMessageByRoom(
    room_idx: number,
    result: (err: Error | null, data: ChatMessageInfo[] | null) => void
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
}
const chatmessageModel = new ChatMessageModel();
export { chatmessageModel };
