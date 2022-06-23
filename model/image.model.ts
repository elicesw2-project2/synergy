// import db from './db';

// interface FileInfo {
//   link: string;
//   fileName: string;
// }
// function ImgSave(link: string) {
//   return new Promise<FileInfo>((resolve, reject) => {
//     db.query(
//       'INSERT INTO workspace SET workspace_img=?',
//       link,
//       (err, result) => {
//         return err ? reject(err) : resolve(result);
//       }
//     );
//   });
// }
// // ImgSave
// export default ImgSave;
