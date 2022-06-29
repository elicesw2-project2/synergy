import db from './db';

export async function findAll(currentUserIdx: Number) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT workspace_idx FROM workspacemember WHERE user_idx=?',
      currentUserIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export function create(workspaceInfo: { name: string; profile: string }) {
  const { name, profile } = workspaceInfo;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO workspace SET name=?, workspace_img=?',
      [name, profile],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({ workspace_idx: result.insertId, ...workspaceInfo });
      }
    );
  });
}

export function findById(workspaceIdx: number) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM workspace WHERE workspace_idx = ?',
      workspaceIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export function update(
  workspaceIdx: number,
  workspaceInfo: { name: string; profile: string }
) {
  const { name, profile } = workspaceInfo;

  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE workspace SET name = ?, workspace_img = ? WHERE workspace_idx = ?',
      [name, profile, workspaceIdx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({ workspace_idx: workspaceIdx, ...workspaceInfo });
      }
    );
  });
}

export function remove(workspaceIdx: number) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE from workspace where workspace_idx = ?',
      workspaceIdx,
      (err, result) => {
        return err ? reject(err) : resolve({ workspace_idx: workspaceIdx });
      }
    );
  });
}
