import axios from 'axios';
import { IChannel } from 'components/Bar/Side/ChannelCategory/ChannelCategory';
import { IWorkSpace } from 'components/Bar/Workspace/WorkspaceBar/WorkspaceBar';
import { IChat } from 'components/Chat/Chatting';
import { IScheduleCard } from 'pages/ScheduleBoard/ScheduleBoard';

const BASE_URL = `https://circuit-synergy.herokuapp.com`;

// workspace
export async function getWorkspaces() {
  const result = await axios.get(`${BASE_URL}/workspaces`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
    },
  });
  return result.data.data;
}

export async function postWorkspace(workspace: IWorkSpace) {
  return await axios.post(`${BASE_URL}/workspaces`, workspace);
}

export async function postImageUpload(imageFile: File) {
  const frm = new FormData();
  frm.append('profile', imageFile);
  const result = await axios.post(`${BASE_URL}/image/upload`, frm);
  return result.data.data;
}

export async function patchWorkspace(workspace: IWorkSpace) {
  return await axios.patch(
    `${BASE_URL}/workspaces/${workspace.workspace_idx}`,
    { name: workspace.name, profile: workspace.workspace_img }
  );
}

export async function deleteWorkspace(idx: number | undefined) {
  return await axios.delete(`${BASE_URL}/workspaces/${idx}`);
}

// channels
export async function getChannelCategory(idx: number) {
  const result = await axios.get(`${BASE_URL}/channelcategory/${idx}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
    },
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
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
    },
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
      },
    }
  );
  return result.data.data;
}

// 메시지 등록
export async function postChatMessage(message: IChat) {
  const result = await axios.post(
    `${BASE_URL}/chatmessage`,
    {
      message: message.message,
      room_idx: message.room_idx,
      nickname: message.nickname,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
      },
    }
  );
  return result.data.data;
}

// 메시지 조회
export async function getChatMessage(idx: number) {
  const result = await axios.get(`${BASE_URL}/chatmessage/${idx}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
    },
  });
  return result.data.data;
}

// 채팅방 조회(아무대도 안쓰는중)
export async function getChatRoom() {
  const result = await axios.get(`${BASE_URL}/chatrooms/1`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
    },
  });
  return result;
}

// user
export async function getUsers(userid: string | null) {
  const result = await axios.get(`${BASE_URL}/users/${userid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
    },
  });
  return result.data.data;
}

// schedule card
export async function getScheduleCards(channelIdx: string | undefined) {
  const result = await axios.get(
    `${BASE_URL}/schedulecards/channel/${channelIdx}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
      },
    }
  );
  return result.data.data;
}

export async function postScheduleCard(data: Partial<IScheduleCard>) {
  const result = await axios.post(`${BASE_URL}/schedulecards`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}` || 'not found',
    },
  });
  return result;
}

export async function deleteScheduleCard(schedulecardIdx: number) {
  const result = await axios.delete(
    `${BASE_URL}/schedulecards/${schedulecardIdx}`
  );
  return result;
}
