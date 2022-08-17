import * as Workspace from '../model/workspace.model';
import { addMember } from '../model/workspaceMember.model';
import { CustomError } from '../middlewares/customError';

interface workpaceData {
  workspace_idx: number;
  name: string;
  profile: string;
}

// 모든 워크스페이스 목록 조회
export async function findAllWorkspaces(currentUserIdx: number) {
  if (!currentUserIdx) {
    throw new CustomError(400, 'user_idx 값이 없습니다');
  }
  const workspaceList = await Workspace.findAllIdx(currentUserIdx);

  const workspaces: workpaceData[] = await Promise.all(
    workspaceList.map((data) => {
      return Workspace.findAll(data);
    })
  );

  return workspaces;
}

// id로 워크스페이스 상세 조회
export async function findWorkspaceById(workspaceIdx: number) {
  const data = await Workspace.findById(Number(workspaceIdx));

  return data;
}

// 워크스페이스 등록
export async function createWorkspace(
  user_idx: number,
  workspaceInfo: {
    name: string;
    profile: string;
  }
) {
  const newWorkspace = await Workspace.create(workspaceInfo);
  const workspace_idx = newWorkspace.workspace_idx;
  await addMember(user_idx, workspace_idx, 'admin');

  return newWorkspace;
}

// 워크스페이스 수정
export async function updateWorkspace(
  workspaceIdx: number,
  workspaceInfo: {
    name: string;
    profile: string;
  }
) {
  console.log('service info', workspaceInfo);

  const updated = await Workspace.update(workspaceIdx, workspaceInfo);
  console.log('service', updated);

  return updated;
}

// 워크스페이스 삭제
export async function removeWorkspace(workspaceIdx: number) {
  await Workspace.remove(workspaceIdx);
}
