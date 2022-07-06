import {
  invitationModel,
  InvitationModel,
  InvitationInfo,
} from '../model/invitation.model';
import { CustomError } from '../middlewares/customError';

class InvitationService {
  constructor(private invitationModel: InvitationModel) {}

  // 초대링크 idx별 초대링크 정보를 받음
  async findInvitationByLink(invitationIdx: number) {
    return await this.invitationModel.findByLink(invitationIdx);
  }

  // 초대링크 등록
  async createInvitation(invitationInfo: InvitationInfo) {
    if (!invitationInfo.link) {
      throw new CustomError(400, '요청값을 다시 확인해주세요.');
    }
    return await this.invitationModel.create(invitationInfo);
  }

  // 초대링크 정보수정
  async updateInvitation(
    invitationIdx: number,
    invitationInfo: InvitationInfo
  ) {
    if (!invitationInfo.link) {
      throw new CustomError(400, '요청값을 다시 확인해주세요.');
    }
    return await this.invitationModel.update(invitationIdx, invitationInfo);
  }
}

const invitationService = new InvitationService(invitationModel);
export { invitationService };
