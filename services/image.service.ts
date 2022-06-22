import fs from 'fs';
import imageHandler from '../middlewares/imageHandler';
import Image from '../model/image.model';
import storage from '../config/s3.config';

interface FileInfo {
  link: string;
  fileName: string;
}
interface FileResponseDto {
  link: string;
}

const uploadFileToS3 = async (
  fileData: Express.Multer.File
): Promise<FileResponseDto> => {
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
  const link = result.Location;
  // const fileName = fileData.originalname;
  const file = await Image(link);
  return file;
};

// const uploadFileToS3 = async (
//   fileData: Express.Multer.File
// ): Promise<FileInfo> => {
//   try {
//   } catch {}
// };

export default uploadFileToS3;
