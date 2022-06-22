import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

// 유저 (본인) 정보 조회
export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.id;

    const user = await userService.findUserById(String(userId));
    return res.status(200).send({
      status: 200,
      message: '유저 정보 조회 성공',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

// 유저 (본인) 정보 수정
export async function setUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id;

    const updatedUser = await userService.updateUser(String(userId), req.body);
    return res.status(200).send({
      status: 200,
      message: '유저 정보 수정 성공',
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
}

// 유저 (본인) 정보 삭제
export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.id;
    const { pw } = req.body;
    const deletedUser = await userService.removeUser(
      String(userId),
      String(pw)
    );
    return res.status(200).send({
      status: 200,
      message: '유저 정보 삭제 성공',
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
}
