import { Request, Response, NextFunction } from 'express';
import * as workspaceMemberService from '../services/workspaceMember.service';

// 모든 유저 목록 가져오기
export async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workspaceIdx = Number(req.params.id);
    const users = await workspaceMemberService.findAllUsers(workspaceIdx);
    res.status(200).send({
      status: 200,
      message: '워크스페이스 유저 목록 조회 성공',
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

// 워크스페이스에 유저 추가
export async function addMember(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser = await workspaceMemberService.createMember(req.body);
    res.status(201).send({
      status: 201,
      message: '워크스페이스 유저 등록 성공',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteMember(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await workspaceMemberService.removeMember(req.body);
    res.status(200).send({
      status: 200,
      message: '워크스페이스 탈퇴 성공',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
