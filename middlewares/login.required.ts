import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

function loginRequired(req: Request, res: Response, next: NextFunction) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const userToken = req.headers['authorization']?.split(' ')[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!userToken || userToken === 'null') {
    console.log('token이 존재하지 않습니다.');
    res.status(401).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });

    return;
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey) as JwtPayload;

    const userId = jwtDecoded.userId;
    const userIdx = jwtDecoded.userIdx;

    req.currentUserId = userId;
    req.currentUserIdx = userIdx;

    next();
  } catch (error) {
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });

    return;
  }
}

export { loginRequired };
