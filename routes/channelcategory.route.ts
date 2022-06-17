import { Router } from 'express';
// import * as channelcategory from '../controllers/channelcategory.controller';
import { channelCategoryController } from '../controllers/channelcategory.controller';

const router = Router();

// 워크스페이스별 채널 카테고리 목록 조회 (/channelcategory/:workspace_idx)
router.get('/:workspace_idx', channelCategoryController.getByWorkspace);

// 채널 카테고리 등록 (/channelcategory)
router.post('/', channelCategoryController.addChannelCategory);

// 채널 카테고리 수정 (/channelcategory/:category_idx)
router.patch('/:category_idx', channelCategoryController.setChannelCategory);

// 채널 카테고리 삭제 (/channelcategory/:category_idx)
router.delete(
  '/:category_idx',
  channelCategoryController.deleteChannelCategory
);

export default router;
