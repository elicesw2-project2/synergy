import { Router } from 'express';
// import * as channelcategory from '../controllers/channelcategory.controller';
import { channelCategoryController } from '../controllers/channelcategory.controller';

const router = Router();

// 채널 카테고리 목록 조회 (/channelcategory)
router.get('/', channelCategoryController.getAll);

// 채널 카테고리 등록 (/channelcategory)
router.post('/', channelCategoryController.create);

// // 채널 카테고리 수정 (/channelcategory/:category_idx)
// router.patch('/', channelcategory.update);

// // 채널 카테고리 삭제 (/channelcategory/:category_idx)
// router.delete('/', channelcategory.delete);

export default router;
