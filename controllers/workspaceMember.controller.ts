import { Request, Response, NextFunction } from 'express';
import findAllUsers from '../services/workspaceMember.service';

// 모든 목록 가져오기
export async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currentUserIdx = Number(req.currentUserId);
    const users = await findAllUsers(currentUserIdx);
    res.status(200).send({
      status: 200,
      message: '워크스페이스 유저 목록 조회 성공',
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

export default getAllUser;
