import {
  chatroomModel,
  ChatRoomModel,
  ChatRoomData,
  ChatRoomInfo,
} from '../model/chat.model';
import { CustomError } from '../middlewares/customError';

class ChatService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private chatroomModel: ChatRoomModel) {}

  async findAllRooms(ChatRoomInfo: number) {
    const workspace_Idx = ChatRoomInfo;
    if (!workspace_Idx) {
      throw new CustomError(400, 'workspace_Idx 값이 없습니다');
    }
    return await this.chatroomModel.findAll(workspace_Idx);
  }

  async createRooms(chatroomInfo: ChatRoomInfo) {
    const { workspace_idx } = chatroomInfo;
    if (!workspace_idx) {
      throw new CustomError(400, 'workspace_Idx 값이 없습니다');
    }
    return await this.chatroomModel.create(chatroomInfo);
  }
}

const chatService = new ChatService(chatroomModel);

// eslint-disable-next-line import/prefer-default-export
export { chatService };
