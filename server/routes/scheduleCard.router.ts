import express from 'express';
import * as scheduleCardController from '../controllers/scheduleCard.controller';
const router = express.Router();
//전체 조회
router.get('/channel/:channel_idx', scheduleCardController.getAllScheduleCards);

//상세 조회
router.get('/:schedulecard_idx', scheduleCardController.getScheduleCardById);

//등록
router.post('/', scheduleCardController.addScheduleCard);
export default router;
