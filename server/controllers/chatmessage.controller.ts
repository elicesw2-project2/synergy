import { NextFunction, Request, Response } from 'express';
import { chatmessageService } from '../services/chatmessage.service';
import { CustomError } from '../middlewares/customError';

class ChatMessageController {
  async getAllChatMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const room_idx: number = Number(req.params.room_idx);
      const messages = await chatmessageService.findAllChatMessageByRoomId(
        room_idx
      );
      res.status(200).send({
        status: 200,
        message: '메시지 조회 성공',
        data: messages,
      });
    } catch (err) {
      next(err);
    }
  }

  async addChatMessage(req: Request, res: Response, next: NextFunction) {
    try {
      /*
      const is = await import("@sindresorhus/is")
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new CustomError(
          400,
          'eaders의 Content-Type을 application/json으로 설정해주세요'
        );
      }
      */

      const user_idx: number = Number(req.currentUserIdx);
      const message = await chatmessageService.createMessage(
        user_idx,
        req.body
      );
      res.status(200).send({
        status: 200,
        message: '메시지 등록 성공',
        data: message,
      });
    } catch (err) {
      next(err);
    }
  }

  async setChatMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const message_idx: number = Number(req.params.message_idx);
      const user_idx: number = Number(req.currentUserIdx);
      const message = await chatmessageService.updateMessage(
        user_idx,
        message_idx,
        req.body
      );
      res.status(200).send({
        status: 200,
        message: '메시지 수정 성공',
        data: message,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const user_idx: number = Number(req.currentUserIdx);
      const message_idx: number = Number(req.params.message_idx);
      const message = await chatmessageService.removeChat(
        user_idx,
        message_idx
      );
      res.status(200).send({
        status: 200,
        message: '메시지 삭제 성공',
        data: message,
      });
    } catch (err) {
      next(err);
    }
  }
}
const chatmessageController = new ChatMessageController();

// eslint-disable-next-line import/prefer-default-export
export { chatmessageController };
