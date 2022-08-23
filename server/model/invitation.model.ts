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
  // link로 초대링크에 대한 정보 반환
  async findOneByLink(link: String): Promise<InvitationData> {
    return new Promise((resolve, reject) => {
      sql.query('SELECT * FROM invitation WHERE link = ?', link, (err, res) => {
        return err ? reject(err) : resolve(res[0]);
      });
    });
  }

  async findOnwByWorkspace(id: number): Promise<InvitationData> {
    return new Promise((resolve, reject) => {
      sql.query(
        'SELECT * FROM invitation WHERE workspace_idx = ?',
        id,
        (err, res) => {
          return err ? reject(err) : resolve(res[0]);
        }
      );
    });
  }

  // 초대링크 db에 등록
  async create(invitationInfo: InvitationInfo): Promise<InvitationData> {
    return new Promise((resolve, reject) => {
      sql.query('INSERT INTO invitation SET ?', invitationInfo, (err, res) => {
        return err
          ? reject(err)
          : resolve({ invitation_idx: res.insertId, ...invitationInfo });
      });
    });
  }

  // workspace_idx로 초대링크의 링크, 유효기간, 최대사용횟수 갱신
  async update(
    workspaceIdx: number,
    invitationInfo: InvitationInfo
  ): Promise<InvitationInfo> {
    const { link, expires_date, maximum_cnt } = invitationInfo;
    return new Promise((resolve, reject) => {
      sql.query(
        'UPDATE invitation SET link = ?, expires_date = ?, maximum_cnt = ? WHERE workspace_idx = ?',
        [link, expires_date, maximum_cnt, workspaceIdx],
        (err, res) => {
          if (err) {
            return reject(err);
          } else {
            if (res.affectedRows === 0) {
              return reject(
                new CustomError(404, '해당 워크스페이스 id를 찾을 수 없습니다.')
              );
            }
            return resolve({
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
