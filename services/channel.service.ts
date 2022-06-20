/* eslint-disable no-shadow */
import {
  channelModel,
  ChannelModel,
  ChannelInfo,
} from '../model/channel.model';
import { CustomError } from '../middlewares/customError';

class ChannelService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private channelModel: ChannelModel) {}

  // 채널 카테고리 id 별 채널 목록을 받음
  async findByChannelCategory(channelIdx: number) {
    // eslint-disable-next-line no-return-await
    return await this.channelModel.findByChannel(channelIdx);
  }

  // 채널 상세 조회
  async findChannelById(channelIdx: number) {
    // eslint-disable-next-line no-return-await
    return await this.channelModel.findById(channelIdx);
  }

  // 채널 등록
  async creatChannel(channelInfo: ChannelInfo) {
    if (!channelInfo.name || !channelInfo.type || !channelInfo.category_idx) {
      throw new CustomError(400, '요청값을 다시 확인해주세요.');
    }
    // db에 저장
    // eslint-disable-next-line no-return-await
    return await this.channelModel.create(channelInfo);
  }

  // 채널 이름 수정
  async updateChannel(channelIdx: number, channelInfo: ChannelInfo) {
    if (!channelInfo.name) {
      throw new CustomError(400, '채널 이름을 넣어주세요');
    }
    // eslint-disable-next-line no-return-await
    return await this.channelModel.update(channelIdx, channelInfo);
  }

  // 채널 삭제
  async removeChannel(channelIdx: number) {
    // eslint-disable-next-line no-return-await
    return await this.channelModel.remove(channelIdx);
  }
}

const channelService = new ChannelService(channelModel);
// eslint-disable-next-line import/prefer-default-export
export { channelService };
