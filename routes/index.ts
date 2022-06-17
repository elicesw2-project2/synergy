export * from './chatroom.route';

import { Router } from 'express';
import channelCategoryRouter from './channelcategory.route';
import { chatRouter } from './chatroom.route';
import { chatmessageRouter } from './chatmessage.route';

const router = Router();

router.use('/channelcategory', channelCategoryRouter);
router.use('/chatrooms', chatRouter);
router.use('/chatmessage', chatmessageRouter);

export default router;
