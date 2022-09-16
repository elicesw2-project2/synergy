import { Router, Request, Response } from 'express';

import FileController from '../controllers/image.controller';
import { upload } from '../utils/s3';
const router: Router = Router();

router.post('/upload', upload.single('profile'), FileController);

export default router;
