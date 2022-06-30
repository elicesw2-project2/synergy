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

  async removeMember(user_idx: number, ChatRoomMemberInfo: ChatRoomMemberInfo) {
    const { room_idx } = ChatRoomMemberInfo;
    if (!room_idx) {
      throw new CustomError(400, '요청 값을 다시 확인해주세요');
    }

    const userId = await this.chatroommemberModel.findUseridxByRoomId(room_idx);

    if (userId != user_idx) {
      throw new CustomError(400, '해당 유저는 채팅방을 나갈 수 없습니다.');
    }

    return this.chatroommemberModel.remove(user_idx, ChatRoomMemberInfo);
  }
}
const chatroommemberService = new ChatRoomMemberService(chatroommemberModel);

// eslint-disable-next-line import/prefer-default-export
export { chatroommemberService };
