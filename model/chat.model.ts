import sql from './db';

export interface ChatRoomData {
  room_idx: number;
  workspace_idx: number;
}

export interface ChatRoomInfo {
  workspace_idx: number;
}

export class ChatRoomModel {
  // eslint-disable-next-line class-methods-use-this
  async getAllChatRooms(
    workspace_idx: number,
    result: (err: Error | null, data: ChatRoomData[] | null) => void
  ) {
    await sql.query(
      'SELECT * FROM chatroom where workspace_idx = ?',
      workspace_idx,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, res);
      }
    );
  }

  async create(
    newchatroomInfo: ChatRoomInfo,
    result: (err: Error | null, data: ChatRoomData | null) => void
  ) {
    sql.query('INSERT INTO chatroom SET ?', newchatroomInfo, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { room_idx: res.insertId, ...newchatroomInfo });
    });
  }
}
const chatroomModel = new ChatRoomModel();
export { chatroomModel };
