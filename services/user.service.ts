import { userModel } from '../model/user.model';
import { CustomError } from '../middlewares/customError';
import bcrypt from 'bcrypt';

// 유저 정보 조회
export async function findUserById(id: string) {
  const userById = await userModel.findById(id);
  if (!userById) {
    throw new CustomError(400, '존재하지 않는 아이디입니다.');
  } else {
    const { id, nickname, profile } = userById;
    return { id, nickname, profile };
  }
}

// 유저 정보 수정
export async function updateUser(
  id: string,
  userInfo: {
    nickname: string;
    profile: string;
  }
) {
  const userByNickname = await userModel.findByNickname(userInfo.nickname);
  if (userByNickname) {
    throw new CustomError(400, '이미 존재하는 닉네임입니다.');
  }

  const updatedUser = await userModel.update(id, userInfo);
  return updatedUser;
}

// 유저 정보 삭제(탈퇴)
export async function removeUser(id: string, pw: string) {
  // 존재하는 id인지 확인
  const userById = await userModel.findById(id);
  if (!userById) {
    throw new CustomError(400, '존재하지 않는 아이디입니다.');
  }

  // 비밀번호 일치 여부 확인
  const correctPasswordHash = userById.pw; // db에 저장되어 있는 암호화된 비밀번호
  // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번째는 db에 있던 암호화된 비밀번호)
  const isPasswordCorrect = await bcrypt.compare(pw, correctPasswordHash);
  if (!isPasswordCorrect) {
    throw new CustomError(400, '비밀번호가 일치하지 않습니다.');
  }

  const deletedUser = await userModel.remove(id);
  return deletedUser;
}
