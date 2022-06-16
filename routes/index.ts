export * from './chat.route';
import { Router } from 'express';
import channelCategoryRouter from './channelcategory.route';

const router = Router();

router.use('/channelcategory', channelCategoryRouter);

export default router;
