import { Request } from 'express';
import multer = require('multer');
import multerS3 = require('multer-s3');
import aws from 'aws-sdk';
import s3 from '../config/s3.config';

type FileNameCallback = (error: Error | null, filename: string) => void;

// interface FileInfo {
//   req: Request;
//   file: Express.Multer.File;
// }
// const imageUpload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket:'circuit-synergy',
//     key : (req: Request, file: Express.Multer.File, cb) {
//       // 확장자가 이미지 파일이 아닐 경우 에러
//       const extension = file.mimetype.split('/')[1];
//       if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(extension)) {
//         return cb(new Error('이미지 파일을 등록해 주세요.'));
//       }

//       cb(null, `${Date.now()}.jpg`);
//     },
//     acl: 'public-read-write',
//   }),
// });

const multerConfig = {
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename(req: Request, file: Express.Multer.File, cb: FileNameCallback) {
      cb(null, file.originalname);
    },
  }),
};
export default multerConfig;
