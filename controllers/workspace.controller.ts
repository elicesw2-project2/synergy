import { Request, Response } from 'express';
import * as workspaceService from '../services/workspace.service';

// 모든 목록 가져오기
export async function getAll(req: Request, res: Response) {
  try {
    const workspaces = await workspaceService.getWorkspaces();
    return res.status(200).json(workspaces);
  } catch (err) {
    // next(err) ??
    console.log(err);
    return res.status(500).json(err);
  }
}
// 특정 워크 스페이스 조회
export async function getById(req: Request, res: Response) {
  try {
    const workspaceId = req.params.workspace_idx;
    const workspace = await workspaceService.getWorkspacesById(
      Number(workspaceId)
    );
    return res.status(200).json(workspace);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
// 새 워크스페이스 등록하기
export async function create(req: Request, res: Response) {
  try {
    console.log(req.body);

    const { name, profile } = req.body;
    const newWorkspace = await workspaceService.addWorkspace({ name, profile });
    return res.status(201).json(newWorkspace);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
}

// 워크스페이스 수정하기
export async function update(req: Request, res: Response) {
  const workspaceId = req.params.workspace_idx;
  const { profile, name } = req.body;
  console.log({ profile, name });
  try {
    const updated = await workspaceService.setWorkspace(
      Number(workspaceId),
      req.body
    );
    return res.status(201).json(updated);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// 워크스페이스 삭제하기
export async function remove(req: Request, res: Response) {
  const workspaceId = req.params.workspace_idx;
  try {
    const deleteWorkspace = await workspaceService.deleteWorkspace(
      Number(workspaceId)
    );
    return res.status(200).json(deleteWorkspace);
  } catch (err) {
    return res.status(500).json(err);
  }
}
