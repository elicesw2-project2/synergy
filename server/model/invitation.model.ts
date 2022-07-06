import sql from './db';
import { CustomError } from '../middlewares/customError';

export interface InvitationInfo {
  workspace_idx: number;
  link: String;
  expires_date: Date;
  maximum_cnt: number;
}

export interface InvitationData {
  invitation_idx: number;
  workspace_idx: number;
  link: String;
  expires_date: Date;
  maximum_cnt: number;
}

export class InvitationModel {
  // invitation_idx로 초대링크 정보 받음
  async findByLink(invitationIdx: number) {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM invitation WHERE invitation_idx = ?',
        invitationIdx,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        }
      );
    });
  }

  // 초대링크 db에 등록
  async create(invitationInfo: InvitationInfo) {
    return new Promise((resolve, reject) => {
      sql.query('INSERT INTO invitation SET ?', invitationInfo, (err, res) => {
        return err
          ? reject(err)
          : resolve({ invitation_idx: res.insertId, ...invitationInfo });
      });
    });
  }

  // invitation_idx로 초대링크의 링크, 유효기간, 최대사용횟수 수정
  async update(invitationIdx: number, invitationInfo: InvitationInfo) {
    const { link, expires_date, maximum_cnt } = invitationInfo;
    return new Promise((resolve, reject) => {
      sql.query(
        'UPDATE invitation SET link = ?, expires_date = ?, maximum_cnt = ? WHERE invitation_idx = ?',
        [link, expires_date, maximum_cnt, invitationIdx],
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            if (res.affectedRows === 0) {
              return reject(
                new CustomError(404, '해당 채널 id를 찾을 수 없습니다.')
              );
            }
            return resolve({
              invitation_idx: invitationIdx,
              ...invitationInfo,
            });
          }
        }
      );
    });
  }
}

const invitationModel = new InvitationModel();
export { invitationModel };
