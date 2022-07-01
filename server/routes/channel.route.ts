import { Router } from 'express';
// import * as channelcategory from '../controllers/channelcategory.controller';
import { channelController } from '../controllers/channel.controller';
import { loginRequired } from '../middlewares/login.required';

const router = Router();

// 카테고리별 채널 목록 조회 (/channel/:category_idx)
router.get(
  '/:category_idx',
  loginRequired,
  channelController.getByChannelCategory
);

// 채널 상세 조회 (/channel/:channel_idx)
router.get('/:channel_idx', loginRequired, channelController.getChannelById);

// 채널 등록 (/channel)
router.post('/', channelController.addChannel);

// 채널 수정 (/channel/:channel_idx)
router.patch('/:channel_idx', channelController.setChannel);

// 채널 삭제 (/channel/:channel_idx)
router.delete('/:channel_idx', channelController.deleteChannel);

export default router;
