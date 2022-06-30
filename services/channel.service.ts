/* eslint-disable no-shadow */
import {
  channelModel,
  ChannelModel,
  ChannelInfo,
} from '../model/channel.model';
import { CustomError } from '../middlewares/customError';

class ChannelService {
  constructor(private channelModel: ChannelModel) {}

  // 채널 카테고리 id 별 채널 목록을 받음
  async findByChannelCategory(channelIdx: number) {
    return await this.channelModel.findByChannel(channelIdx);
  }

  // 채널 상세 조회
  async findChannelById(channelIdx: number) {
    return await this.channelModel.findById(channelIdx);
  }

  // 채널 등록
  async createChannel(channelInfo: ChannelInfo) {
    if (!channelInfo.name || !channelInfo.type || !channelInfo.category_idx) {
      throw new CustomError(400, '요청값을 다시 확인해주세요.');
    }
    // db에 저장
    return await this.channelModel.create(channelInfo);
  }

  // 채널 이름 수정
  async updateChannel(channelIdx: number, channelInfo: ChannelInfo) {
    if (!channelInfo.name || !channelInfo.category_idx) {
      throw new CustomError(400, '요청값을 다시 확인해주세요.');
    }
    return await this.channelModel.update(channelIdx, channelInfo);
  }

  // 채널 삭제
  async removeChannel(channelIdx: number) {
    return await this.channelModel.remove(channelIdx);
  }
}

const channelService = new ChannelService(channelModel);
export { channelService };
