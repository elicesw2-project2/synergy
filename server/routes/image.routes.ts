import { Router, Request, Response } from 'express';
import multer from 'multer';
import multerConfig from '../middlewares/imageHandler';
import FileController from '../controllers/image.controller';

const router: Router = Router();

const upload = multer(multerConfig);

router.post('/upload', upload.single('profile'), FileController);

export default router;
