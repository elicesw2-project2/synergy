import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userModel, UserModel, UserInfo } from '../model/user.model';
import { CustomError } from './customError';

async function loginRequired(req: Request, res: Response, next: NextFunction) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const accessToken = req.headers['authorization']?.split(' ')[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!accessToken || accessToken === 'null') {
    res.status(401).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });

    return;
  }

  try {
    // accessToken 유효성 검사
    const userToken = verifyToken(accessToken);

    // access token 만료
    if (userToken == 'jwt expired') {
      // access 토큰에서 유저 id값 가져오기

      const jwtDecoded = jwt.decode(accessToken) as JwtPayload;
      const userId = jwtDecoded.userId;
      console.log(userId);

      // 가져온 유저 id로 user 테이블에서 refresh token 값 가져오기
      const userInfo = userModel.findById(userId);
      const refreshToken = (await userInfo).refresh_token;

      const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
      const jwtDecoded2 = jwt.verify(refreshToken, secretKey);

      // refresh token 유효성 검사
      const checkedRefresh = verifyToken(refreshToken);

      // refresh token 만료시 로그인 요청
      if (checkedRefresh == 'jwt expired') {
        throw new CustomError(401, '로그인이 필요합니다.');
      } else {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const newAccessToken = jwt.sign(
          { userId: (await userInfo).id, userIdx: (await userInfo).user_idx },
          secretKey,
          {
            expiresIn: '1d',
          }
        );
        res.send({ message: 'new token', newAccessToken });
      }

      // access token과 refresh token 모두 유효한 경우
    } else {
      // id와 idx를 넘겨줌
      const userId = userToken.userId;
      const userIdx = userToken.userIdx;
      req.currentUserId = userId;
      req.currentUserIdx = userIdx;

      next();
    }
  } catch (err) {
    res.send({ errorMessage: err + ' : 로그인이 필요합니다.' });
  }

  function verifyToken(token: any) {
    // 해당 token 이 정상적인 token인지 확인
    try {
      const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
      const jwtDecoded = jwt.verify(token, secretKey) as JwtPayload;
      return jwtDecoded;
    } catch (error: any) {
      // res.send({ errorMessage: error + ' : 유효하지 않은 토큰입니다.' });
      return error.message;
    }
  }
}

export { loginRequired };
