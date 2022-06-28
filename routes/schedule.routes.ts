import express from 'express';
import bodyParser from 'body-parser';
import * as {schedulecardController} from '../controllers/schedule.controller';

const parser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
// create
router.get('/', schedulecardController.getAllSchedules);
router.get('/:schedulecontainer_idx', schedulecardController.getSchedulecardById);
router.post('/', schedulecardController.addSchedulecard);
router.patch('/:schedulecontainer_idx', schedulecardController.setSchedulecard);
router.delete('/:schedulecontainer_idx',schedulecardController. deleteSchedulecard);
export default router;
