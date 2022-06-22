export * from './chatroom.route';

import { Router } from 'express';
import authRouter from './auth.route';
import channelCategoryRouter from './channelcategory.route';
import channelRouter from './channel.route';
import { chatRouter } from './chatroom.route';
import { chatmessageRouter } from './chatmessage.route';
import { chatroommemberRouter } from './chatroommember.route';
const router = Router();

router.use('/auth', authRouter);
router.use('/channelcategory', channelCategoryRouter);
router.use('/chatrooms', chatRouter);
router.use('/chatmessage', chatmessageRouter);
router.use('/chatroommember', chatroommemberRouter);
router.use('/channel', channelRouter);

export default router;
