import fs from 'fs';
import imageHandler from '../middlewares/imageHandler';
import storage from '../config/s3.config';
import { config } from 'dotenv';
import { resolve } from 'path';
import { rejects } from 'assert';
import s3 from '../config/s3.config';

interface FileInfo {
  link: string;
  fileName: string;
}
interface FileResponseDto {
  link: string;
}

// const uploadFileToS3 = async (fileData: Express.Multer.File) => {
//   const fileContent: Buffer = fs.readFileSync(fileData.path);
//   const params: {
//     Bucket: string;
//     Key: string;
//     Body: Buffer;
//   } = {
//     Bucket: String(process.env.AWS_BUCKET),
//     Key: fileData.originalname,
//     Body: fileContent,
//   };

//   const result = await imageHandler.storage(params).promise();
//   //const link = `https://d19um727s1pdbh.cloudfront.net/${result.Key}`;
//   const link = result.Location;
//   // const fileName = fileData.originalname;
//   return link;
// };

const uploadFileToS3 = async (fileData: Express.Multer.File): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileContent: Buffer = fs.readFileSync(fileData.path);
      const params: {
        Bucket: string;
        Key: string;
        Body: Buffer;
      } = {
        Bucket: String(process.env.AWS_BUCKET),
        Key: fileData.originalname,
        Body: fileContent,
      };

      // const result = await imageHandler.storage(params).promise();
      //const link = `https://d19um727s1pdbh.cloudfront.net/${result.Key}`;
      s3.upload(params, (err: Error, result: any) => {
        if (err) {
          reject(err);
          return;
        }
        if (result == undefined) {
          reject(new Error('Fail to file upload'));
        } else {
          const link = result.Location;
          resolve(link);
        }
      });
      // const fileName = fileData.originalname;
    } catch (e) {
      reject(e);
    }
  });
};

export default uploadFileToS3;

// export const s3Upload = (fileData: Express.Multer.File): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const fileContent: Buffer = fs.readFileSync(fileData.path);
//       const uploadParams: {
//         Bucket: string;
//         Body: Buffer;
//         Key: string;
//       } = {
//         Bucket: String(process.env.AWS_BUCKET),
//         Body: fileContent,
//         key: fileData.originalname,
//       };
//       s3.upload(uploadParams, (err: Error, data) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         if (data == undefined) {
//           reject(new Error('Fail to file upload'));
//         } else {
//           resolve(201);
//         }
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
