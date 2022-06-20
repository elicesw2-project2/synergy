import { Request, Response } from 'express';
import imageUpload from '../middlewares/imageHandler';
import FileService from '../services/image.service';

// import { Request, Response } from 'express';
// import
// import
// module.exports = {
//   post: async (req: Request, res: Response) => {
//     if (!req.file) return res.status(401).json('cannot found img file');
//     const fileData: Express.Multer.File = req.file;
//     try {
//       const data = await FileService.uploadFileToS3(fileData);
//       res.status(201).json(data);
//     } catch (err) {
//       console.log(err);
//       res.status(500);
//     }
//   },
// };

// imageRouter.post(
//   '/register',
//   imageUpload.array('images'),
//   async (req: Request, res: Response, next: any) => {
//     try {
//       // req.files에서 이미지 경로만 가져옴
//       const imagePath = req.files.map((image) => image.location);

//       res.status(200).json(imagePath);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
const uploadFileToS3 = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(404).json('파일없음');
  }
  const fileData: Express.Multer.File = req.file;
  try {
    const data = await FileService(fileData);
    res.status(201).json('파일 업로드 성공');
  } catch (error) {
    console.log(error);
    res.status(500).json('오류가 생겼습니다.');
  }
};
export default uploadFileToS3;
