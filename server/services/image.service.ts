import fs from 'fs';
import imageHandler from '../middlewares/imageHandler';
import storage from '../config/s3.config';

interface FileInfo {
  link: string;
  fileName: string;
}
interface FileResponseDto {
  link: string;
}

const uploadFileToS3 = async (fileData: Express.Multer.File) => {
  const fileContent: Buffer = fs.readFileSync(fileData.path);
  const params: {
    Bucket: string;
    Key: string;
    Body: Buffer;
  } = {
    Bucket: 'circuit-synergy',
    Key: fileData.originalname,
    Body: fileContent,
  };
  const result = await storage.upload(params).promise();
  const link = `https://dk5tzlq8j97g2.cloudfront.net/${result.Key}`;
  // const fileName = fileData.originalname;

  return link;
};

// const uploadFileToS3 = async (
//   fileData: Express.Multer.File
// ): Promise<FileInfo> => {
//   try {
//   } catch {}
// };

export default uploadFileToS3;
