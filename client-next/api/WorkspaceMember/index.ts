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

export const addUser = async (data: any) => {
  await axios.post(`${BASE_URL}/workspacemembers`, data, {
    headers: token,
  });
};

export const deleteUser = async (workspace_idx: number, userIdx: number) => {
  const result = await axios.delete(`${BASE_URL}/workspacemembers/${userIdx}`, {
    headers: token,
    data: {
      workspace_idx,
    },
  });
  return result.data.data;
};
