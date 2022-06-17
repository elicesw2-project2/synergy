import { Router } from 'express';
import channelCategoryRouter from './channelcategory.route';
import channelRouter from './channel.route';

const router = Router();

router.use('/channelcategory', channelCategoryRouter);
router.use('/channel', channelRouter);

export default router;
