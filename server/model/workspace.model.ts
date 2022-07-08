import db from './db';

interface workpaceData {
  workspace_idx: number;
  name: string;
  profile: string;
}
// export async function findAllIdx(currentUserIdx: Number) {
//   return new Promise((resolve, reject) => {
//     db.query(
//       'SELECT workspace_idx FROM workspacemember WHERE user_idx=?',
//       currentUserIdx,
//       (err, result) => {
//         let dataList: number[] = [];
//         for (let data of result) {
//           dataList.push(data.workspace_idx);
//         }
//         return err ? reject(err) : resolve(dataList);
//       }
//     );
//   }).then((v)=>{

//   })
// }
export async function findAllIdx(currentUserIdx: Number): Promise<number[]> {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT workspace_idx FROM workspacemember WHERE user_idx=?',
      currentUserIdx,
      (err, result) => {
        let dataList: number[] = [];
        for (let i = 0; i < result.length; i++) {
          dataList.push(result[i].workspace_idx);
        }
        return err ? reject(err) : resolve(dataList);
      }
    );
  });
}

//   return new Promise((resolve, reject)=>{
// const workspaceIdx = await db.query(
//   'SELECT workspace_idx FROM workspacemember WHERE user_idx=?',
//   currentUserIdx,
//   (err, result) => {
//     let dataList: number[] = [];
//     for (let data of result) {
//       dataList.push(data.workspace_idx);
//     }
//   }
// );
// let workspaces = [];
// workspaceIdx.map((id) => {
//   const workpsaces = await db.query(
//     'SELECT * FROM workspace WHERE workspace_idx=?',
//     workspaceIdx
//   );
// });
// return workpsaces;
//   })

// 이거를 await을 사용해서 받아오고 받아오는 형식으로 할건데 어떻게 받아오는지 잘 모르겟음
export async function findAll(workspaceIdx: Number): Promise<workpaceData> {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM workspace WHERE workspace_idx=?',
      workspaceIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result[0]);
      }
    );
  });
}
export function create(workspaceInfo: {
  name: string;
  profile: string;
}): Promise<workpaceData> {
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
