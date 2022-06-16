import { NextFunction, Request, Response } from 'express';
import { chatService } from '../services/chat.service';

class ChatController {
  // eslint-disable-next-line class-methods-use-this
  // async getChatRooms(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const workspace_idx: number = Number(req.params.workspace_idx);

  //     const rooms = await chatService.getRooms(workspace_idx);

  //     console.log('controller', rooms);
  //     // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
  //     res.status(200).json({
  //       status: 200,
  //       message: 'ChatRooms loaded successfully',
  //       data: rooms,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  async getChatRooms(req: Request, res: Response, next: NextFunction) {
    const workspace_idx: number = Number(req.params.workspace_idx);

    await chatService.getRooms(
      workspace_idx,
      (err: Error | null, data: any) => {
        if (err) {
          next(err);
        }
        res.status(200).send({
          status: 200,
          message: 'ChatRooms loaded successfully',
          data,
        });
      }
    );
  }

  async createChatRooms(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      throw new Error('응답바디없음');
    }
    // console.log('controller1', req.body);
    const workspace_idx = req.body.workspace_idx;
    await chatService.addChatRoom(
      workspace_idx,
      (err: Error | null, data: any) => {
        if (err) {
          next(err);
        }
        res.status(201).send({
          status: 201,
          message: 'ChatRoom created successfully',
        });
      }
    );
  }
}
const chatController = new ChatController();

// eslint-disable-next-line import/prefer-default-export
export { chatController };
