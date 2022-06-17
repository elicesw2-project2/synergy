import { NextFunction, Request, Response } from 'express';
import { chatService } from '../services/chat.service';

class ChatController {
  // eslint-disable-next-line class-methods-use-this
  async getAllRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const workspace_idx: number = Number(req.params.workspace_idx);
      const rooms = await chatService.findAllRooms(workspace_idx);
      res.status(200).send({
        status: 200,
        message: '채팅방 조회 성공',
        data: rooms,
      });
    } catch (err) {
      next(err);
    }
  }

  async addRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const room = await chatService.createRooms(req.body);
      res.status(200).send({
        status: 200,
        message: '채팅방 생성 성공',
        data: room,
      });
    } catch (err) {
      next(err);
    }
  }
}
const chatController = new ChatController();

// eslint-disable-next-line import/prefer-default-export
export { chatController };
