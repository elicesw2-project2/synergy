import axios from 'axios';
import { IChannel } from 'components/Bar/Side/ChannelCategory';

const BASE_URL = `https://circuit-synergy.herokuapp.com`;

// workspace
export async function postImageUpload(imageFile: File) {
  const frm = new FormData();
  frm.append('profile', imageFile);
  const result = await axios
    .post(`${BASE_URL}/image/upload`, frm)
    .then((res) => console.log(res));
  return result;
}

// channels
export async function getChannelCategory() {
  const result = await axios.get(`${BASE_URL}/channelcategory/1`);
  return result.data.data;
}

export async function getChannels() {
  const result = await axios.get(`${BASE_URL}/channel/1`);
  return result.data.data;
}

export async function postChannel(data: IChannel) {
  const result = await axios.post(`${BASE_URL}/channel`, data);
  console.log(result);
  return result;
}
