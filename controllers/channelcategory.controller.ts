import { Request, Response, NextFunction } from 'express';
import { channelCategoryService } from '../services/channelcategory.service';

class ChannelCategoryController {
  // 채널 카테고리 목록 전체 조회
  // eslint-disable-next-line class-methods-use-this
  async getAll(req: Request, res: Response, next: NextFunction) {
    await channelCategoryService.getChannelCategory(
      (err: Error | null, data: any) => {
        if (err) {
          next(err);
        }
        res.status(200).send({
          status: 200,
          message: '채널 카테고리 목록 조회 성공',
          data,
        });
      }
    );
  }

  // 채널 카테고리 등록
  // eslint-disable-next-line class-methods-use-this
  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      throw new Error('응답바디없음');
    }
    console.log(req.body);
    await channelCategoryService.addChannelCategory(
      req.body,
      (err: Error | null, data: any) => {
        if (err) {
          next(err);
        }
        res.status(201).send({
          status: 201,
          message: '채널 카테고리 등록 성공',
          data,
        });
      }
    );

    // try {
    //   // req의 body 데이터를 db에 추가
    //   const newChannelCategory =
    //     await channelCategoryService.addChannelCategory(req.body);
    //   res.status(201).send({
    //     status: 201,
    //     message: '채널 카테고리 등록 성공',
    //     data: newChannelCategory,
    //   });
    // } catch (error) {
    //   next(error);
    // }
  }
}

const channelCategoryController = new ChannelCategoryController();
// eslint-disable-next-line import/prefer-default-export
export { channelCategoryController };
