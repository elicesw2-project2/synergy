import {
  chatroomModel,
  ChatRoomModel,
  ChatRoomData,
  ChatRoomInfo,
} from '../model/chat.model';

class ChatService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private chatroomModel: ChatRoomModel) {}

  async getRooms(
    ChatRoomInfo: number,
    result: (err: Error | null, data: ChatRoomData[] | null) => void
  ) {
    const workspace_Idx = ChatRoomInfo;
    if (workspace_Idx == null) {
      throw new Error('required value is not allowed to be null');
    }

    // const rooms: any = await this.chatroomModel.getAllChatRooms(workspaceIdx);
    // console.log('service', rooms);
    // return rooms;

    await this.chatroomModel.getAllChatRooms(workspace_Idx, (err, data) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, data);
    });
  }

  async addChatRoom(
    chatroomInfo: ChatRoomInfo,
    result: (err: Error | null, data: ChatRoomData | null) => void
  ) {
    // db저장
    return this.chatroomModel.create(chatroomInfo, (err, data) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, data);
    });
  }
}

const chatService = new ChatService(chatroomModel);

// eslint-disable-next-line import/prefer-default-export
export { chatService };
