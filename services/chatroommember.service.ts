import {
  ChatRoomMemberInfo,
  chatroommemberModel,
  ChatRoomMemberModel,
} from '../model/chatroommember.model';
import { CustomError } from '../middlewares/customError';

class ChatRoomMemberService {
  constructor(private chatroommemberModel: ChatRoomMemberModel) {}

  async findMemberByRoomId(room_idx: number) {
    if (!room_idx) {
      throw new CustomError(400, 'room_idx 값이 없습니다');
    }
    return this.chatroommemberModel.findByRoomId(room_idx);
  }

  async createMember(ChatRoomMemberInfo: ChatRoomMemberInfo) {
    const { user_idx, room_idx } = ChatRoomMemberInfo;
    if (!user_idx || !room_idx) {
      throw new CustomError(400, '요청 값을 다시 확인해주세요');
    }
    return this.chatroommemberModel.create(ChatRoomMemberInfo);
  }

  async removeMember(ChatRoomMemberInfo: ChatRoomMemberInfo) {
    const { user_idx, room_idx } = ChatRoomMemberInfo;
    if (!user_idx || !room_idx) {
      throw new CustomError(400, '요청 값을 다시 확인해주세요');
    }
    return this.chatroommemberModel.remove(ChatRoomMemberInfo);
  }
}
const chatroommemberService = new ChatRoomMemberService(chatroommemberModel);

// eslint-disable-next-line import/prefer-default-export
export { chatroommemberService };
