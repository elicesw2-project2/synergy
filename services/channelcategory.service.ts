/* eslint-disable no-shadow */
import {
  channelCategoryModel,
  ChannelCategoryModel,
  ChannelCategoryInfo,
  ChannelCategoryData,
} from '../model/channelcategory.model';
import { customError } from '../middlewares/customError';

class ChannelCategoryService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private channelCategoryModel: ChannelCategoryModel) {}

  // 채널 카테고리 목록을 받음
  async getChannelCategory(
    result: (err: Error | null, data: ChannelCategoryData[] | null) => void
  ) {
    await this.channelCategoryModel.getAll(
      (err: Error | null, data: ChannelCategoryData[] | null) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, data);
      }
    );

    // const category = await channelCategoryModel.getAll2();
    // console.log('서비스');
    // console.log(category);
  }

  // 채널 카테고리 등록
  async addChannelCategory(
    categoryInfo: ChannelCategoryInfo,
    result: (err: Error | null, data: ChannelCategoryData | null) => void
  ) {
    // db저장
    return this.channelCategoryModel.create(
      categoryInfo,
      (err: Error | null, data: ChannelCategoryData | null) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, data);
      }
    );
  }

  // 특정 채널 카테고리의 이름 수정
  // db에서 찾지 못한 경우 에러 던짐

  // 채널 카테고리 삭제
  // db에서 찾지 못한 경우 에러 던짐
}

const channelCategoryService = new ChannelCategoryService(channelCategoryModel);
// eslint-disable-next-line import/prefer-default-export
export { channelCategoryService };
