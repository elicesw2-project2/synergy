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

  async createMessage(
    user_idx: Record<string, any> | undefined,
    ChatMessageInfo: ChatMessageInfo
  ) {
    const { message, room_idx } = ChatMessageInfo;
    if (!message || !room_idx) {
      throw new CustomError(400, '요청 값을 다시 확인해주세요');
    }
    return this.chatmessageModel.create(user_idx, ChatMessageInfo);
  }

  async updateMessage(
    user_idx: Record<string, any> | undefined,
    message_idx: number,
    ChatMessageInfo: ChatMessageInfo
  ) {
    if (!message_idx) {
      throw new CustomError(400, 'message_idx 값이 없습니다');
    }

    const userId = await this.chatmessageModel.findUseridxByMessageId(
      message_idx
    );

    if (userId != user_idx) {
      throw new CustomError(400, '해당 유저는 이 메시지를 수정할 수 없습니다.');
    }

    if (!ChatMessageInfo.message) {
      throw new CustomError(400, '요청 값을 다시 확인해주세요');
    }
    return this.chatmessageModel.update(message_idx, ChatMessageInfo);
  }

  async removeChat(
    user_idx: Record<string, any> | undefined,
    message_idx: number
  ) {
    if (!message_idx) {
      throw new CustomError(400, 'message_idx 값이 없습니다');
    }

    const userId = await this.chatmessageModel.findUseridxByMessageId(
      message_idx
    );

    if (userId != user_idx) {
      throw new CustomError(400, '해당 유저는 이 메시지를 삭제할 수 없습니다.');
    }

    return this.chatmessageModel.remove(message_idx);
  }
}

const chatmessageService = new ChatMessageService(chatmessageModel);

// eslint-disable-next-line import/prefer-default-export
export { chatmessageService };
