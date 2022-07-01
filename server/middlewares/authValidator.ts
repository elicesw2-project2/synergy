import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// 유효성 에러 검사 함수
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ messasge: errors.array()[0] });
  }

  return next();
};

// 로그인 유효성 검사
export const validateLogin = [
  body('id')
    .trim()
    .isEmail()
    .normalizeEmail()
    .notEmpty()
    .withMessage('Invalid email'),
  body('pw')
    .isLength({ min: 5 })
    .withMessage('비밀번호는 최소 5자리 이상이어야 합니다.'),
  validate,
];

// 회원가입 유효성 검사
export const validateSignup = [
  ...validateLogin,
  body('nickname')
    .trim()
    .isLength({ max: 8 })
    .withMessage('닉네임을 8글자 이하로 설정해주세요.'),
  validate,
];
