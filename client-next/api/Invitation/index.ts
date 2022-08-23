import axios from 'axios';

const BASE_URL = `https://circuit-synergy.herokuapp.com`;

let token: any;
if (typeof window !== 'undefined') {
  token = {
    Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
  };
}

export const postInvitation = async (data: any) => {
  const result = await axios.post(`${BASE_URL}/invitation`, data, {
    headers: token,
  });
  return result;
};
