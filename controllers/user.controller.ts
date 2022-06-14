import sql from '../model/db';

// 새 객체 생성
export async function createUser(user: any) {
  const { id, pw, nickname, profile } = user;
  sql.query(
    'INSERT INTO user(id, pw, nickname, profile) VALUES (?,?,?,?)',
    [id, pw, nickname, profile],
    (results) => {
      console.log(results);
      return results;
    }
  );
}

// id로 조회
export function findByUserid(id: string) {
  return null;
}
