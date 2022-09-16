import { Request, Response, NextFunction } from 'express';
import FileService from '../services/image.service';

const uploadFileToS3 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(404).json('파일없음');
  }
  const fileData: Express.Multer.File = req.file;
  try {
    const imageLink = await FileService(fileData);
    res.status(201).send({
      status: 201,
      message: '파일 업로드 성공',
      data: imageLink,
    });
  } catch (error) {
    next(error);
  }
};
export default uploadFileToS3;
