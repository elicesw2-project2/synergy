import AWS from 'aws-sdk';
import multer = require('multer');
import multerS3 = require('multer-s3');

// AWS SDK 설정
console.log('env, ', process.env.AWS_BUCKET_REGION);
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

export default s3;
