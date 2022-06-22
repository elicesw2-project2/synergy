import * as Workspace from '../model/workspace.model';

// 모든 워크스페이스 목록 조회
export async function getWorkspaces() {
  const workspaces = await Workspace.findAll();
  console.log('service', workspaces);

  return workspaces;
}

// id로 워크스페이스 상세 조회
export async function getWorkspacesById(workspaceIdx: number) {
  const data = await Workspace.getWorkspaceById(Number(workspaceIdx));

  return data;
}

// 워크스페이스 등록
export async function addWorkspace(workspaceInfo: {
  name: string;
  profile: string;
}) {
  const newWorkspace = await Workspace.create(workspaceInfo);
  console.log('service', newWorkspace);

  return newWorkspace;
}

// 워크스페이스 수정
export async function setWorkspace(
  workspaceIdx: number,
  workspaceInfo: {
    name: string;
    profile: string;
  }
) {
  console.log('service info', workspaceInfo);

  const updated = await Workspace.updateById(workspaceIdx, workspaceInfo);
  console.log('service', updated);

  return updated;
}

// 워크스페이스 삭제
export async function deleteWorkspace(workspaceIdx: number) {
  await Workspace.remove(workspaceIdx);
}
