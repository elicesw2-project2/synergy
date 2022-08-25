import {
  WorkspaceMemberInfo,
  findAll,
  findUser,
  addMember,
  remove,
  getRole,
} from '../model/workspaceMember.model';

export async function findAllUsers(workspaceIdX: Number) {
  return await findAll(workspaceIdX);
}
export async function findUserById(workspaceIdX: Number, userIdx: Number) {
  return await findUser(workspaceIdX, userIdx);
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
export async function checkRole(workspaceIdx: Number, userIdx: Number) {
  const role = await getRole(workspaceIdx, userIdx);
  return role === 'admin' ? 0 : 1;
}
