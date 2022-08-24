import axios from 'axios';

const BASE_URL = `https://circuit-synergy.herokuapp.com`;

let token: any;
if (typeof window !== 'undefined') {
  token = {
    Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
  };
}

export const getUserList = async (workspaceIdx: number) => {
  const result = await axios.get(
    `${BASE_URL}/workspacemembers/${workspaceIdx}`,
    {
      headers: token,
    }
  );
  return result.data.data;
};

export const deleteUser = async () => {
  const result = await axios.delete(`${BASE_URL}/workspacemember`, {
    headers: token,
  });
  return result.data.data;
};
