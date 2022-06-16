import {
  chatmessageModel,
  ChatMessageModel,
  ChatMessageData,
  ChatMessageInfo,
} from '../model/chatmessage.model';

class ChatMessageService {
  constructor(private chatmessageModel: ChatMessageModel) {}

  async getMessages(
    room_idx: number,
    result: (err: Error | null, data: ChatMessageData[] | null) => void
  ) {
    return this.chatmessageModel.getAllChatMessageByRoom(
      room_idx,
      (err: Error | null, data: ChatMessageData[] | null) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, data);
      }
    );
  }

  async createMessage(
    ChatMessageInfo: ChatMessageInfo,
    result: (err: Error | null, data: ChatMessageData | null) => void
  ) {
    return this.chatmessageModel.addChatMessage(
      ChatMessageInfo,
      (err, data) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, data);
      }
    );
  }
}

const chatmessageService = new ChatMessageService(chatmessageModel);

// eslint-disable-next-line import/prefer-default-export
export { chatmessageService };
