import axios from 'axios';

const BASE_URL = `https://circuit-synergy.herokuapp.com`;

export async function postImageUpload(imageFile: File) {
  const frm = new FormData();
  frm.append('profile', imageFile);
  const response = await axios
    .post(`${BASE_URL}/image/upload`, frm)
    .then((res) => console.log(res));
  return response;
}

export async function 임시() {
  console.log('임시');
}
