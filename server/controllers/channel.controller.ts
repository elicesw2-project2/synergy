// eslint-disable-next-line import/no-unresolved
// import is from '@sindresorhus/is';
import { Request, Response, NextFunction } from 'express';
import { channelService } from '../services/channel.service';
import { CustomError } from '../middlewares/customError';

class ChannelController {
  // 카테고리별 채널 목록 전체 조회
  async getByChannelCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const channels = await channelService.findByChannelCategory(
        Number(req.params.category_idx)
      );
      res.status(200).send({
        status: 200,
        message: '채널 목록 조회 성공',
        data: channels,
      });
    } catch (err) {
      next(err);
    }
  }

  // 채널 상세 조회
  async getChannelById(req: Request, res: Response, next: NextFunction) {
    try {
      const channel = await channelService.findChannelById(
        Number(req.params.channel_idx)
      );
      res.status(200).send({
        status: 200,
        message: '채널 상세 조회 성공',
        data: channel,
      });
    } catch (err) {
      next(err);
    }
  }

  // 채널 등록
  async addChannel(req: Request, res: Response, next: NextFunction) {
    try {
      const channel = await channelService.createChannel(req.body);
      res.status(201).send({
        status: 201,
        message: '채널 등록 성공',
        data: channel,
      });
    } catch (err) {
      next(err);
    }
  }

  // 채널 수정
  async setChannel(req: Request, res: Response, next: NextFunction) {
    try {
      const channel = await channelService.updateChannel(
        Number(req.params.channel_idx),
        req.body
      );
      res.status(200).send({
        status: 200,
        message: '채널 수정 성공',
        data: channel,
      });
    } catch (err) {
      next(err);
    }
  }

  // 채널 카테고리 삭제
  async deleteChannel(req: Request, res: Response, next: NextFunction) {
    try {
      const channel = await channelService.removeChannel(
        Number(req.params.channel_idx)
      );
      res.status(200).send({
        status: 200,
        message: '채널 삭제 성공',
        data: channel,
      });
    } catch (err) {
      next(err);
    }
  }
}

const channelController = new ChannelController();
// eslint-disable-next-line import/prefer-default-export
export { channelController };
