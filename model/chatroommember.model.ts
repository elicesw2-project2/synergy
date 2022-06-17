import sql from './db';

export interface ChatRoomMemberData {
  join_idx: number;
  user_idx: number;
  room_idx: number;
}

export interface ChatRoomMemberInfo {
  user_idx: number;
  room_idx: number;
}

export class ChatRoomMemberModel {
  async findByRoomId(room_idx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM chatroommember where room_idx = ?',
        room_idx,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      );
    });
  }

  async create(ChatRoomMemberInfo: ChatRoomMemberInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'INSERT INTO chatroommember SET ?',
        ChatRoomMemberInfo,
        (err, res) => {
          return err
            ? reject(err)
            : resolve({ join_idx: res.insertId, ...ChatRoomMemberInfo });
        }
      );
    });
  }

  async remove(ChatRoomMemberInfo: ChatRoomMemberInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'DELETE FROM chatroommember where user_idx = ? and room_idx = ?',
        [ChatRoomMemberInfo.user_idx, ChatRoomMemberInfo.room_idx],
        (err, res) => {
          if (res.affectedRows === 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return reject({
              status: 404,
              message: '해당 member를 찾을 수 없습니다.',
            });
          }

          return err ? reject(err) : resolve({ ...ChatRoomMemberInfo });
        }
      );
    });
  }
}

const chatroommemberModel = new ChatRoomMemberModel();
export { chatroommemberModel };
