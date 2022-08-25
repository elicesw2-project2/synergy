import axios from 'axios';

const BASE_URL = `https://circuit-synergy.herokuapp.com`;

let token: any;
if (typeof window !== 'undefined') {
  token = {
    Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
  };
}

export const getInvitationLink = async (link: string) => {
  const result = await axios.get(`${BASE_URL}/invitation/${link}`, {
    headers: token,
  });
  console.log(result);
  return result.data.data.workspace_idx;
};

export const postInvitation = async (data: any) => {
  const result = await axios.post(`${BASE_URL}/invitation`, data, {
    headers: token,
  });
  return result.data.data.link;
};
