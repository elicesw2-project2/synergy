import { Request, Response, NextFunction } from 'express';
import { channelCategoryService } from '../services/channelcategory.service';
import { CustomError } from '../middlewares/customError';

class ChannelCategoryController {
  // 채널 카테고리 목록 전체 조회
  // eslint-disable-next-line class-methods-use-this
  async getAllByWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const channelCategorys = await channelCategoryService.getChannelCategory2(
        Number(req.params.workspace_idx)
      );
      res.status(200).send({
        status: 200,
        message: '채널 카테고리 목록 조회 성공',
        data: channelCategorys,
      });
    } catch (err) {
      next(err);
    }
  }

  // 채널 카테고리 등록
  // eslint-disable-next-line class-methods-use-this
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        throw new CustomError(
          400,
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }
      const channelCategory = await channelCategoryService.addChannelCategory(
        req.body
      );
      res.status(201).send({
        status: 201,
        message: '채널 카테고리 등록 성공',
        data: channelCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  // 채널 카테고리 수정
  // eslint-disable-next-line class-methods-use-this
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body) {
        throw new CustomError(
          400,
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }
      const channelCategory =
        await channelCategoryService.updateChannelCategory(
          Number(req.params.category_idx),
          req.body
        );
      res.status(200).send({
        status: 200,
        message: '채널 카테고리 수정 성공',
        data: channelCategory,
      });
    } catch (err) {
      next(err);
    }
  }

  // 채널 카테고리 삭제
  // eslint-disable-next-line class-methods-use-this
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const channelCategory =
        await channelCategoryService.deleteChannelCategory(
          Number(req.params.category_idx)
        );
      res.status(200).send({
        status: 200,
        message: '채널 카테고리 삭제 성공',
        data: channelCategory,
      });
    } catch (err) {
      next(err);
    }
  }
}

const channelCategoryController = new ChannelCategoryController();
// eslint-disable-next-line import/prefer-default-export
export { channelCategoryController };
