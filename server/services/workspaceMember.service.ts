import {
  WorkspaceMemberInfo,
  findAll,
  addMember,
  remove,
} from '../model/workspaceMember.model';

export async function findAllUsers(workspaceIdX: Number) {
  return await findAll(workspaceIdX);
}

export async function createMember(memberInfo: WorkspaceMemberInfo) {
  return await addMember(memberInfo);
}

export async function removeMember(workspaceIdx: Number, userIdx: Number) {
  return await remove(workspaceIdx, userIdx);
}
