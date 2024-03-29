import axios from 'axios';
import { IChannel } from '../components/Bar/Side/ChannelCategory';
import { IWorkSpace } from '../components/Bar/Workspace/WorkspaceBar';
// import { IChat } from 'components/Chat/Chatting';
import { IDocument } from 'components/Document';
import { IScheduleCard } from 'components/ScheduleBoard/ScheduleBoard';

const BASE_URL = `https://circuit-synergy.herokuapp.com`;
let token: any;
if (typeof window !== 'undefined') {
  token = {
    Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
  };
  console.log(token);
}

// workspace
export async function getWorkspaces() {
  const result = await axios.get(`${BASE_URL}/workspaces`, {
    headers: token,
  });
  return result.data.data;
}

export async function postWorkspace(workspace: IWorkSpace) {
  return await axios.post(`${BASE_URL}/workspaces`, workspace, {
    headers: token,
  });
}

export async function postImageUpload(imageFile: any) {
  const frm = new FormData();
  frm.append('profile', imageFile);
  const result = await axios.post(`${BASE_URL}/image/upload`, frm);
  return result.data.data;
}

export async function patchWorkspace(workspace: IWorkSpace) {
  return await axios.patch(
    `${BASE_URL}/workspaces/${workspace.workspace_idx}`,
    { name: workspace.name, profile: workspace.workspace_img },
    {
      headers: token,
    }
  );
}

export async function deleteWorkspace(idx: number | undefined) {
  return await axios.delete(`${BASE_URL}/workspaces/${idx}`, {
    headers: token,
  });
}

// channels
export async function getChannelCategory(idx: number) {
  const result = await axios.get(`${BASE_URL}/channelcategory/${idx}`, {
    headers: token,
  });
  return result.data.data;
}

export async function postChannelCategory(data: {
  name: string;
  workspace_idx: string | undefined;
}) {
  return await axios.post(`${BASE_URL}/channelcategory`, data);
}

export async function deleteChannelCategory(idx: number) {
  return await axios.delete(`${BASE_URL}/channelcategory/${idx}`);
}

export async function getChannels(idx: number) {
  const result = await axios.get(`${BASE_URL}/channel/${idx}`, {
    headers: token,
  });
  return result.data.data;
}

export async function postChannel(channel: IChannel) {
  return await axios.post(`${BASE_URL}/channel`, channel);
}

export async function patchChannel(channel: IChannel) {
  return await axios.patch(
    `${BASE_URL}/channel/${channel.channel_idx}`,
    channel
  );
}

export async function deleteChannel(idx: number | undefined) {
  return await axios.delete(`${BASE_URL}/channel/${idx}`);
}

// chat
// 채팅방 만들기(완료)
export async function postChatRoom(idx: number) {
  const result = await axios.post(
    `${BASE_URL}/chatrooms`,
    { workspace_idx: idx },
    {
      headers: token,
    }
  );
  return result.data.data;
}

// 메시지 등록
// export async function postChatMessage(message: IChat) {
//   const result = await axios.post(
//     `${BASE_URL}/chatmessage`,
//     {
//       message: message.message,
//       room_idx: message.room_idx,
//       nickname: message.nickname,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
//       },
//     }
//   );
//   return result.data.data;
// }

// 메시지 조회
export async function getChatMessage(idx: number) {
  const result = await axios.get(`${BASE_URL}/chatmessage/${idx}`, {
    headers: token,
  });
  return result.data.data;
}

// 채팅방 조회(아무대도 안쓰는중)
export async function getChatRoom(idx: number) {
  const result = await axios.get(`${BASE_URL}/chatrooms/${idx}`, {
    headers: token,
  });
  return result.data.data;
}

// user
export async function getUsers(userid: string | null) {
  const result = await axios.get(`${BASE_URL}/users/${userid}`, {
    headers: token,
  });
  return result.data.data;
}

// schedule card
export async function getScheduleCards(channelIdx: string | undefined) {
  const result = await axios.get(
    `${BASE_URL}/schedulecards/channel/${channelIdx}`,
    {
      headers: token,
    }
  );
  return result.data.data;
}

export async function postScheduleCard(data: Partial<IScheduleCard>) {
  const result = await axios.post(`${BASE_URL}/schedulecards`, data, {
    headers: token,
  });
  return result;
}

export async function deleteScheduleCard(schedulecardIdx: number) {
  const result = await axios.delete(
    `${BASE_URL}/schedulecards/${schedulecardIdx}`
  );
  return result;
}

export async function patchScheduleCard({ data, schedulecardIdx }: any) {
  const result = await axios.patch(
    `${BASE_URL}/schedulecards/${schedulecardIdx}`,
    data,
    {
      headers: token,
    }
  );
  return result;
}

// document
export async function getDocument(channelIdx: string) {
  const result = await axios.get(
    `${BASE_URL}/documents/channel/${channelIdx}`,
    {
      headers: token,
    }
  );
  return result.data.data[0];
}

export async function postDocument(data: Partial<IDocument>) {
  const result = await axios.post(`${BASE_URL}/documents`, data, {
    headers: token,
  });
  return result;
}

export async function deleteDocument(Idx: number) {
  const result = await axios.delete(`${BASE_URL}/documents/${Idx}`, {
    headers: token,
  });
  return result;
}
