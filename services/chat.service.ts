import {
  chatroomModel,
  ChatRoomModel,
  ChatRoomInfo,
} from '../model/chat.model';

class ChatService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private chatroomModel: ChatRoomModel) {}

  async getRooms(
    workspace_idx: number,
    result: (err: Error | null, data: ChatRoomInfo[] | null) => void
  ) {
    const workspaceIdx = workspace_idx;
    if (workspaceIdx == null) {
      throw new Error('required value is not allowed to be null');
    }

    // const rooms: any = await this.chatroomModel.getAllChatRooms(workspaceIdx);
    // console.log('service', rooms);
    // return rooms;

    await this.chatroomModel.getAllChatRooms(
      workspaceIdx,
      (err: Error | null, data: ChatRoomInfo[] | null) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, data);
      }
    );
  }

  async addChatRoom(
    workspace_idx: number,
    result: (err: Error | null, data: ChatRoomInfo | null) => void
  ) {
    // db저장
    return this.chatroomModel.create(
      workspace_idx,
      (err: Error | null, data: ChatRoomInfo | null) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, data);
      }
    );
  }
}

const chatService = new ChatService(chatroomModel);

// eslint-disable-next-line import/prefer-default-export
export { chatService };
