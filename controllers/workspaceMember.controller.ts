import { Request, Response, NextFunction } from 'express';
import findAllUsers from '../services/workspaceMember.service';

// 모든 목록 가져오기
export async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workspaceIdx = Number(req.params.id);
    const users = await findAllUsers(workspaceIdx);
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
