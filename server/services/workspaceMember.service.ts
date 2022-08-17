import {
  WorkspaceMemberInfo,
  findAll,
  addMember,
  remove,
} from '../model/workspaceMember.model';

export async function findAllUsers(workspaceIdX: Number) {
  return await findAll(workspaceIdX);
}

export async function createMember(
  userIdx: Number,
  workspaceIdx: Number,
  role: String
) {
  return await addMember(userIdx, workspaceIdx, role);
}

export async function removeMember(workspaceIdx: Number, userIdx: Number) {
  return await remove(workspaceIdx, userIdx);
}
