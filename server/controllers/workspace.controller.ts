import { Request, Response, NextFunction } from 'express';
import * as workspaceService from '../services/workspace.service';

// 모든 목록 가져오기
export async function getAllWorkspaces(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currentUserIdx = Number(req.currentUserIdx);

    const workspaces = await workspaceService.findAllWorkspaces(currentUserIdx);
    res.status(200).send({
      status: 200,
      message: '워크스페이스 목록 조회 성공',
      data: workspaces,
    });
  } catch (err) {
    next(err);
  }
}
// 특정 워크 스페이스 조회
export async function getWorkspaceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workspaceId = req.params.workspace_idx;
    const workspace = await workspaceService.findWorkspaceById(
      Number(workspaceId)
    );
    res.status(200).send({
      status: 200,
      message: '워크스페이스 조회 성공',
      data: workspace,
    });
  } catch (err) {
    next(err);
  }
}

//특정 유저가 속해있는 워크 스페이스 조회
// export async function getWorkspaceByUserId(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ){
//   try{

//   }
// }
// 새 워크스페이스 등록하기
export async function addWorkspace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_idx = Number(req.currentUserIdx);
    //여기인가?
    const newWorkspace = await workspaceService.createWorkspace(
      user_idx,
      req.body
    );

    return res.status(201).json(req.body);
  } catch (err) {
    next(err);
  }
}

// 워크스페이스 수정하기
export async function setWorkspace(req: Request, res: Response) {
  const workspaceId = req.params.workspace_idx;
  try {
    const updated = await workspaceService.updateWorkspace(
      Number(workspaceId),
      req.body
    );
    return res.status(201).json(updated);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// 워크스페이스 삭제하기
export async function deleteWorkspace(req: Request, res: Response) {
  const workspaceId = req.params.workspace_idx;

  try {
    const deleteWorkspace = await workspaceService.removeWorkspace(
      Number(workspaceId)
    );
    return res.status(200).json(deleteWorkspace);
  } catch (err) {
    return res.status(500).json(err);
  }
}
