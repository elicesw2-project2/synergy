import db from './db';

export interface WorkspaceMemberInfo {
  user_idx: number;
  workspace_idx: number;
}

export async function findAll(workspaceIdx: Number) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM workspacemember WHERE workspace_idx=?',
      workspaceIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function addMember(memberInfo: WorkspaceMemberInfo) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO workspacemember SET ?', memberInfo, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

export async function remove(memberInfo: WorkspaceMemberInfo) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM chatroommember where user_idx = ? and workspace_idx = ?',
      [memberInfo.user_idx, memberInfo.workspace_idx],
      (err, result) => {
        return err ? reject(err) : resolve({ user_idx: memberInfo.user_idx });
      }
    );
  });
}
