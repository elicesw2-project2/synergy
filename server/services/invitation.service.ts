import {
  invitationModel,
  InvitationModel,
  InvitationInfo,
} from '../model/invitation.model';
import { CustomError } from '../middlewares/customError';

class InvitationService {
  constructor(private invitationModel: InvitationModel) {}

  // 워크스페이스 idx별 초대링크 정보를 받음
  async findInvitationByLink(link: String) {
    const invitation = await this.invitationModel.findOneByLink(link);

    const { workspace_idx, expires_date, maximum_cnt } = invitation;
    const current = new Date(); // 현재시간

    // 만료날짜가 현재시간보다 과거거나, 횟수가 0인 경우 만료된 링크라고 반환
    if (expires_date < current || maximum_cnt == 0) {
      throw new CustomError(400, '만료된 링크입니다.');
    } else {
      // 만료되지 않았다면 사용횟수 -1 해서 갱신
      const count = maximum_cnt - 1;
      const invitationInfo = {
        workspace_idx,
        link,
        expires_date,
        maximum_cnt: count,
      };
      await this.invitationModel.update(workspace_idx, invitationInfo);
      return invitation;
    }
  }

  // 초대링크 생성
  async createInvitation(invitationInfo: InvitationInfo) {
    const { workspace_idx, expires_date, maximum_cnt } = invitationInfo;
    if (!expires_date || !maximum_cnt) {
      throw new CustomError(400, '요청값을 다시 확인해주세요.');
    }
    // 이미 초대링크가 있는 워크스페이스라면 update
    const invitation = await this.invitationModel.findOnwByWorkspace(
      workspace_idx
    );
    if (invitation) {
      console.log('이미 존재하는 워크스페이스입니다. 초대링크를 갱신합니다.');
      return await this.updateInvitation(workspace_idx, invitationInfo);
    }
    // 새로운 링크 생성. 현재 밀리초를 36진수로 표현
    const link = new Date().getTime().toString(36);
    invitationInfo.link = link;
    return await this.invitationModel.create(invitationInfo);
  }

  // 워크스페이스 초대링크 갱신
  async updateInvitation(workspaceIdx: number, invitationInfo: InvitationInfo) {
    if (!invitationInfo.expires_date || !invitationInfo.maximum_cnt) {
      throw new CustomError(400, '요청값을 다시 확인해주세요.');
    }
    // 새로운 링크 생성. 현재 밀리초를 36진수로 표현
    const link = new Date().getTime().toString(36);
    invitationInfo.link = link;
    return await this.invitationModel.update(workspaceIdx, invitationInfo);
  }
}

const invitationService = new InvitationService(invitationModel);
export { invitationService };
