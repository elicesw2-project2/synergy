/* eslint-disable no-shadow */
import {
  channelCategoryModel,
  ChannelCategoryModel,
  ChannelCategoryInfo,
} from '../model/channelcategory.model';
import { CustomError } from '../middlewares/customError';

class ChannelCategoryService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private channelCategoryModel: ChannelCategoryModel) {}

  // 채널 카테고리 목록을 받음
  async getChannelCategory2(workspaceIdx: number) {
    // eslint-disable-next-line no-return-await
    return await this.channelCategoryModel.getAllByWorkSpace(workspaceIdx);
  }

  // 채널 카테고리 등록
  async addChannelCategory(categoryInfo: ChannelCategoryInfo) {
    // db에 저장
    // eslint-disable-next-line no-return-await
    return await this.channelCategoryModel.create(categoryInfo);
  }

  // 채널 카테고리의 이름 수정
  async updateChannelCategory(
    categoryIdx: number,
    categoryInfo: ChannelCategoryInfo
  ) {
    if (!categoryInfo.name) {
      throw new CustomError(400, '카테고리 이름을 넣어주세요');
    }
    // eslint-disable-next-line no-return-await
    return await this.channelCategoryModel.updateById(
      categoryIdx,
      categoryInfo
    );
  }

  // 채널 카테고리 삭제
  async deleteChannelCategory(categoryIdx: number) {
    // eslint-disable-next-line no-return-await
    return await this.channelCategoryModel.remove(categoryIdx);
  }
}

const channelCategoryService = new ChannelCategoryService(channelCategoryModel);
// eslint-disable-next-line import/prefer-default-export
export { channelCategoryService };
