import sql from './db';

export interface ChatRoomInfo {
  workspace_idx: number;
}

export class ChatRoomModel {
  // eslint-disable-next-line class-methods-use-this
  async getAllChatRooms(
    workspace_idx: number,
    result: (err: Error | null, data: ChatRoomInfo[] | null) => void
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
    // const data = await sql.query(
    //   'SELECT * FROM chatroom where workspace_idx = ?',
    //   workspace_idx
    // );

    // console.log(data);
    // return data;
  }

  async create(
    workspace_idx: number,
    result: (err: Error | null, data: ChatRoomInfo | null) => void
  ) {
    sql.query(
      'INSERT INTO chatroom (workspace_idx) VALUES (?)',
      workspace_idx,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        console.log(res);
        result(null, res);
      }
    );
  }
}
const chatroomModel = new ChatRoomModel();
export { chatroomModel };
