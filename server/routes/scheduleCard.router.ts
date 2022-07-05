import express from 'express';
import * as scheduleCardController from '../controllers/scheduleCard.controller';
const router = express.Router();

router.get('/:channel_idx', scheduleCardController.getAllScheduleCards);
// router.get('/:schedulecontainer_idx');

//등록
router.post('/', scheduleCardController.addScheduleCard);
export default router;
