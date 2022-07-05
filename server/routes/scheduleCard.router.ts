import express from 'express';
import * as scheduleCardController from '../controllers/scheduleCard.controller';
import { loginRequired } from '../middlewares/login.required';
const router = express.Router();
//전체 조회
router.get('/channel/:channel_idx', scheduleCardController.getAllScheduleCards);

//상세 조회
router.get('/:schedulecard_idx', scheduleCardController.getScheduleCardById);

//등록
router.post('/', loginRequired, scheduleCardController.addScheduleCard);
//
export default router;
