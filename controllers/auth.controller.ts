/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';

import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import * as userRepository from './user.controller';

dotenv.config();

// 기본 설정
// const jwtSecretKey = process.env.AUTH_jwtSecretKey;
// const jwtExpiresInDays = process.env.AUTH_jwtExpiresInDays;
const bcryptSaltRounds = Number(process.env.AUTH_bcryptSaltRounds);

// signup 확인 + 토큰
export default async function signup(req: Request, res: Response) {
  const { id, pw, nickname, profile } = req.body;
  // const found = await userRepository.findByUserid(id);

  // console.log(`found:${found}`);
  // if (found) {
  //   return res.status(409).json({
  //     status: 409,
  //     message: `${id} already exists`,
  //   });
  // }
  const hashed = await bcrypt.hash(pw, bcryptSaltRounds);
  await userRepository.createUser({
    id,
    pw: hashed,
    nickname,
    profile,
  });

  // const token = createJwtToken(userId);
  res.status(201).json({
    status: 201,
    message: '회원가입 성공',
    data: { id },
  });
}
