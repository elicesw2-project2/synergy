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

export async function remove(workspaceIdx: Number, userIdx: Number) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM workspacemember where user_idx = ? and workspace_idx = ?',
      [userIdx, workspaceIdx],
      (err, result) => {
        return err ? reject(err) : resolve({ user_idx: userIdx });
      }
    );
  });
}
