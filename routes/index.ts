export * from './chatroom.route';

import { Router } from 'express';
import channelCategoryRouter from './channelcategory.route';
import { chatRouter } from './chatroom.route';
import { chatmessageRouter } from './chatmessage.route';
import { chatroommemberRouter } from './chatroommember.route';
const router = Router();

router.use('/channelcategory', channelCategoryRouter);
router.use('/chatrooms', chatRouter);
router.use('/chatmessage', chatmessageRouter);
router.use('/chatroommember', chatroommemberRouter);

export default router;
