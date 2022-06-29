import {
  WorkspaceMemberInfo,
  findAll,
  addMember,
} from '../model/workspaceMember.model';

export async function findAllUsers(workspaceIdX: Number) {
  return await findAll(workspaceIdX);
}

export async function createMember(memberInfo: WorkspaceMemberInfo) {
  return await addMember(memberInfo);
}
