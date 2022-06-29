import findAll from '../model/workspaceMember.model';

async function findAllUsers(workspaceIdX: Number) {
  const users = await findAll(workspaceIdX);
  return users;
}

export default findAllUsers;
