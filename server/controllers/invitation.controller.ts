import { Request, Response, NextFunction } from 'express';
import { invitationService } from '../services/invitation.service';
import { CustomError } from '../middlewares/customError';

class InvitationController {
  // 초대링크 정보 전체 조회
  async getInvitation(req: Request, res: Response, next: NextFunction) {
    try {
      const invitations = await invitationService.findInvitationByLink(
        req.params.link
      );
      res.status(200).send({
        status: 200,
        message: '워크스페이스 초대링크 정보 조회 성공',
        data: invitations,
      });
    } catch (err) {
      next(err);
    }
  }

  // 초대링크 등록
  async addInvitation(req: Request, res: Response, next: NextFunction) {
    try {
      const invitation = await invitationService.createInvitation(req.body);
      res.status(201).send({
        status: 201,
        message: '워크스페이스 초대링크 생성 성공',
        data: invitation,
      });
    } catch (err) {
      next(err);
    }
  }

  // 초대링크 갱신
  async setInvitation(req: Request, res: Response, next: NextFunction) {
    try {
      const invitation = await invitationService.updateInvitation(
        Number(req.params.workspace_idx),
        req.body
      );
      res.status(200).send({
        status: 200,
        message: '워크스페이스 초대링크 갱신 성공',
        data: invitation,
      });
    } catch (err) {
      next(err);
    }
  }
}

const invitationController = new InvitationController();
export { invitationController };
