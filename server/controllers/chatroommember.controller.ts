import { NextFunction, Request, Response } from 'express';
import { chatroommemberService } from '../services/chatroommember.service';

class ChatRoomMemberController {
  async getMemberByRoomId(req: Request, res: Response, next: NextFunction) {
    try {
      const room_idx: number = Number(req.params.room_idx);
      const members = await chatroommemberService.findMemberByRoomId(room_idx);
      res.status(200).send({
        status: 200,
        message: '채팅방 멤버 조회 성공',
        data: members,
      });
    } catch (err) {
      next(err);
    }
  }

  async addMember(req: Request, res: Response, next: NextFunction) {
    try {
      const member = await chatroommemberService.createMember(req.body);
      res.status(200).send({
        status: 200,
        message: '채팅방 멤버 추가 성공',
        data: member,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteMember(req: Request, res: Response, next: NextFunction) {
    try {
      const user_idx: number = Number(req.currentUserIdx);
      const member = await chatroommemberService.removeMember(
        user_idx,
        req.body
      );
      res.status(200).send({
        status: 200,
        message: '채팅방 나가기 성공',
        data: member,
      });
    } catch (err) {
      next(err);
    }
  }
}

const chatroommemberController = new ChatRoomMemberController();

// eslint-disable-next-line import/prefer-default-export
export { chatroommemberController };
