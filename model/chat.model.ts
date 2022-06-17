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
  async findAll(workspace_idx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM chatroom where workspace_idx = ?',
        workspace_idx,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      );
    });
  }

  async create(newchatroomInfo: ChatRoomInfo) {
    return new Promise((resolve, reject) => {
      sql.query('INSERT INTO chatroom SET ?', newchatroomInfo, (err, res) => {
        return err
          ? reject(err)
          : resolve({ room_idx: res.insertId, ...newchatroomInfo });
      });
    });
  }
}
const chatroomModel = new ChatRoomModel();
export { chatroomModel };
