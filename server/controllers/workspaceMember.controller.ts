import { Request, Response, NextFunction } from 'express';
import * as workspaceMemberService from '../services/workspaceMember.service';

// 모든 유저 목록 가져오기
export async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workspaceIdx = Number(req.params.workspace_idx);
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
    const userIdx = Number(req.currentUserIdx);
    const role = req.body.role;
    const workspaceIdx = Number(req.body.workspace_idx);
    const userCheck = await workspaceMemberService.findUserById(
      workspaceIdx,
      userIdx
    );
    if (userCheck) {
      return res
        .status(409)
        .json({ status: 409, message: `${userIdx} already exists` });
    }
    const newUser = await workspaceMemberService.createMember(
      userIdx,
      workspaceIdx,
      role
    );
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
    const workspaceIdx = Number(req.body.workspace_idx);
    const userIdx = Number(req.params.user_idx);
    const currentUserIdx = Number(req.currentUserIdx);
    if (userIdx === currentUserIdx) {
      return res
        .status(400)
        .json({ status: 400, message: `이 유저는 삭제할 수 없습니다.` });
    }
    const user = await workspaceMemberService.removeMember(
      workspaceIdx,
      userIdx
    );
    res.status(200).send({
      status: 200,
      message: '워크스페이스 유저 삭제 성공',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
export async function getUserRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workspaceIdx = Number(req.body.workspace_idx);
    const userIdx = Number(req.currentUserIdx);
    const role = await workspaceMemberService.checkRole(workspaceIdx, userIdx);
    res.status(200).send({
      status: 200,
      message: '워크스페이스 유저 권한 확인 성공',
      data: role,
    });
  } catch (err) {
    next(err);
  }
}
