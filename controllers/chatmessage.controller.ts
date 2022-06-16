import { NextFunction, Request, Response } from 'express';
import { chatmessageService } from '../services/chatmessage.service';

class ChatMessageController {
  async getChatMessages(req: Request, res: Response, next: NextFunction) {
    const room_idx: number = Number(req.params.room_idx);

    await chatmessageService.getMessages(
      room_idx,
      (err: Error | null, data: any) => {
        if (err) {
          next(err);
        }
        res.status(200).send({
          status: 200,
          message: 'ChatMessages loaded successfully',
          data,
        });
      }
    );
  }
}
const chatmessageController = new ChatMessageController();

// eslint-disable-next-line import/prefer-default-export
export { chatmessageController };
