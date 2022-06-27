/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel, UserModel, UserInfo } from '../model/user.model';
import { CustomError } from '../middlewares/customError';

class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userModel: UserModel) {}

  // 회원가입
  async createUser(userInfo: UserInfo) {
    // id 중복 확인
    const userById = await this.userModel.findById(userInfo.id);
    if (userById) {
      throw new CustomError(400, '이미 가입된 id 입니다.');
    }

    // 닉네임 중복 확인
    const userByNickname = await this.userModel.findByNickname(
      userInfo.nickname
    );
    if (userByNickname) {
      throw new CustomError(400, '이미 존재하는 닉네임입니다.');
    }

    const hashed = await bcrypt.hash(userInfo.pw, 10);
    userInfo.pw = hashed;

    // db에 저장
    const createdNewUser = await this.userModel.create(userInfo);
    return createdNewUser;
  }

  // 로그인
  async login(loginInfo: UserInfo) {
    const { id, pw } = loginInfo;
    // 해당 이메일이 db에 존재하는지 확인
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new CustomError(400, '해당 이메일은 가입 내역이 없습니다.');
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.pw; // db에 저장되어 있는 암호화된 비밀번호
    // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번째는 db에 있던 암호화된 비밀번호)
    const isPasswordCorrect = await bcrypt.compare(pw, correctPasswordHash);
    if (!isPasswordCorrect) {
      throw new CustomError(400, '비밀번호가 일치하지 않습니다.');
    }

    // 로그인 성공 : JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign({ userId: user.id }, secretKey);

    return { token, id };
  }
}

const authService = new AuthService(userModel);
// eslint-disable-next-line import/prefer-default-export
export { authService };
