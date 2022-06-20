/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { authService } from '../services/auth.service';

dotenv.config();

// signup
class AuthController {
  // 회원가입
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        throw new Error('응답바디없음');
      }
      // 새 유저 등록
      const user = await authService.createUser(req.body);
      res.status(200).send({
        status: 200,
        message: '회원가입 성공',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  // 로그인
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        throw new Error('응답바디없음');
      }

      // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
      const userData = await authService.login(req.body);
      res.status(200).send({
        status: 200,
        message: '로그인 성공',
        data: userData,
      });
    } catch (err) {
      next(err);
    }
  }
}

const authController = new AuthController();
// eslint-disable-next-line import/prefer-default-export
export { authController };
