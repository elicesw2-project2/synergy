/* eslint-disable class-methods-use-this */
// /* eslint-disable class-methods-use-this */
import { userInfo } from 'os';
import sql from './db';

export interface UserInfo {
  id: string;
  pw: string;
  profile: string;
  nickname: string;
  refresh_token: string;
}

export interface UserData {
  user_idx: string;
  id: string;
  pw: string;
  profile: string;
  nickname: string;
  role: string;
  refresh_token: string;
}

export class UserModel {
  // eslint-disable-next-line class-methods-use-this
  // id로 개별 User 조회
  async findById(id: string): Promise<UserData> {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * FROM user WHERE id = ?`, id, (err, res) => {
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

  // 유저 정보 수정
  async update(id: string, userInfo: { nickname: string; profile: string }) {
    const { nickname, profile } = userInfo;
    return new Promise((resolve, reject) => {
      sql.query(
        'UPDATE user SET nickname = ?, profile = ? WHERE id = ?',
        [nickname, profile, id],
        (err, res) => {
          return err ? reject(err) : resolve({ id, ...userInfo });
        }
      );
    });
  }

  // 유저 정보 삭제
  async remove(id: string) {
    return new Promise((resolve, reject) => {
      sql.query('DELETE from user where id = ?', id, (err, res) => {
        return err ? reject(err) : resolve({ id });
      });
    });
  }

  // refresh 토큰 저장(수정)
  async updateRefreshToken(id: string, refreshToken: string) {
    return new Promise((resolve, reject) => {
      sql.query(
        'UPDATE user SET refresh_token =? WHERE id = ?',
        [refreshToken, id],
        (err, res) => {
          return err ? reject(err) : resolve({ id, ...userInfo });
        }
      );
    });
  }
}

const userModel = new UserModel();
export { userModel };
