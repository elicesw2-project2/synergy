// import AWS from 'aws-sdk';
// import { S3Client } from '@aws-sdk/client-s3';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import dotenv from 'dotenv';
// dotenv.config();

// const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_REGION, AWS_BUCKET } =
//   process.env;

// const s3Config = new S3Client({
//   region: AWS_BUCKET_REGION,
//   credentials: {
//     accessKeyId: String(AWS_ACCESS_KEY),
//     secretAccessKey: String(AWS_SECRET_ACCESS_KEY),
//   },
// });

// const s3Storage = multerS3({
//   s3: s3Config,
//   bucket: String(AWS_BUCKET),
//   key(req, file, cb) {
//     cb(null, `Images/${Date.now().toString()}/${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage: s3Storage,
// });

// export { upload };
