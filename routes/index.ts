export * from './chatroom.route';

import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import channelCategoryRouter from './channelcategory.route';
import channelRouter from './channel.route';
import { chatRouter } from './chatroom.route';
import { chatmessageRouter } from './chatmessage.route';
import { chatroommemberRouter } from './chatroommember.route';
import documentRouter from './document.route';
import workspaceRouter from './workspace.router';
import imageRouter from './image.routes';
import scheduleRouter from './schedule.routes';
const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/channelcategory', channelCategoryRouter);
router.use('/chatrooms', chatRouter);
router.use('/chatmessage', chatmessageRouter);
router.use('/chatroommember', chatroommemberRouter);
router.use('/channel', channelRouter);
router.use('/documents', documentRouter);
router.use('/workspaces', workspaceRouter);
router.use('/image', imageRouter);
router.use('/schedulecards', scheduleRouter);
export default router;
