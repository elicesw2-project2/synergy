import findAll from '../model/workspaceMember.model';

async function findAllUsers(currentUserIdx: Number) {
  const users = await findAll(currentUserIdx);
  return users;
}

export default findAllUsers;
