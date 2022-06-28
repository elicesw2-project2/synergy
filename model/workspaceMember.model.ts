import db from './db';

export async function findAll(currentUserIdx: Number) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM workspacemember WHERE user_idx=?',
      currentUserIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export default findAll;
