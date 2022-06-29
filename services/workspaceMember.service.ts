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

export async function removeMember(memberInfo: WorkspaceMemberInfo) {
  return await remove(memberInfo);
}
