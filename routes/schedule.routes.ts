import express from 'express';
import bodyParser from 'body-parser';
import getAllSchedules from '../controllers/schedule.controller';

const parser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
// create
router.get('/', getAllSchedules);

export default router;
