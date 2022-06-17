import {
  chatmessageModel,
  ChatMessageModel,
  ChatMessageInfo,
} from '../model/chatmessage.model';
import { CustomError } from '../middlewares/customError';

class ChatMessageService {
  constructor(private chatmessageModel: ChatMessageModel) {}

  async findAllChatMessageByRoomId(room_idx: number) {
    if (!room_idx) {
      throw new CustomError(400, 'room_idx 값이 없습니다');
    }
    return this.chatmessageModel.findAllByRoomId(room_idx);
  }

  async createMessage(ChatMessageInfo: ChatMessageInfo) {
    const { message, room_idx, user_idx } = ChatMessageInfo;
    if (!message || !room_idx || !user_idx) {
      throw new CustomError(400, '요청 값을 다시 확인해주세요');
    }
    return this.chatmessageModel.create(ChatMessageInfo);
  }
}

const chatmessageService = new ChatMessageService(chatmessageModel);

// eslint-disable-next-line import/prefer-default-export
export { chatmessageService };
