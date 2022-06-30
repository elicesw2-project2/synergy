import express from 'express';
import getAllScheduleCards from '../controllers/scheduleCard.controller';
const router = express.Router();

router.get('/', getAllScheduleCards);

export default router;
