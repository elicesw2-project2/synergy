/* eslint-disable class-methods-use-this */
// /* eslint-disable class-methods-use-this */
import { userInfo } from 'os';
import sql from './db';

export interface UserInfo {
  id: string;
  pw: string;
  profile: string;
  nickname: string;
}

export interface UserData {
  user_idx: string;
  id: string;
  pw: string;
  profile: string;
  nickname: string;
  role: string;
}

export class UserModel {
  // eslint-disable-next-line class-methods-use-this
  // id로 개별 User 조회
  async findById(id: string): Promise<UserData> {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM user WHERE id = ?`, id, (err, res) => {
        // console.log('-------res', res[0]);
        return err ? reject(err) : resolve(res[0]);
      });
    });
  }

  // nickname으로 개별 User 조회
  async findByNickname(nickname: string) {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT * FROM user WHERE nickname = ?`,
        nickname,
        (err, res) => {
          return err ? reject(err) : resolve(res[0]);
        }
      );
    });
  }

  // 새 user db에 추가
  // eslint-disable-next-line class-methods-use-this
  async create(user: UserInfo) {
    return new Promise((resolve, reject) => {
      sql.query(
        'INSERT INTO user(id, pw, nickname, profile) VALUES (?,?,?,?)',
        [user.id, user.pw, user.nickname, user.profile],
        (err, res) => {
          return err
            ? reject(err)
            : resolve({ user_idx: res.insertId, ...userInfo });
        }
      );
    });
  }
}

const userModel = new UserModel();
export { userModel };
