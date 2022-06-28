// import { Request, Response, NextFunction } from 'express';
// import * as scheduleCardService from '../services/schedule.service';

// export async function getAllSchedules(
//   res: Response,
//   req: Request,
//   next: NextFunction
// ) {
//   try {
//     const schedules = await scheduleCardService.findAllSchedules();
//     res.status(200).send({
//       status: 200,
//       message: '스케줄 카드 전체 목록 조회 성공',
//       data: schedules,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// export async function getSchedulecardById(
//   res: Response,
//   req: Request,
//   next: NextFunction
// ) {
//   const scheduleId = Number(req.params.id);
//   try {
//     const scheduleCard = await scheduleCardService.findScheduleCardById(
//       scheduleId
//     );
//     res.status(200).send({
//       status: 200,
//       message: '스케줄 카드 조회 성공',
//       data: scheduleCard,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// export async function setScheduleCard(
//   res: Response,
//   req: Request,
//   next: NextFunction
// ) {
//   try {
//     const schdeuldCardIdx = Number(req.params.id);
//     const scheduleCard = await scheduleCardService.setScheduleCard(
//       schdeuldCardIdx,
//       req.body
//     );
//     res.status(201).send({
//       status: 201,
//       message: '스케줄 카드 수정 성공',
//       data: scheduleCard,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// export async function createScheduleCard(
//   res: Response,
//   req: Request,
//   next: NextFunction
// ) {
//   try {
//     const schdeuldCardIdx = Number(req.params.id);
//     const scheduleCard = await scheduleCardService.setScheduleCard(
//       schdeuldCardIdx,
//       req.body
//     );
//     res.status(201).send({
//       status: 201,
//       message: '스케줄 카드 등록 성공',
//       data: scheduleCard,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// export async function deleteScheduleCard(
//   res: Response,
//   req: Request,
//   next: NextFunction
// ) {
//   try {
//     const scheduleCardIdx = Number(req.params.id);
//     await scheduleCardService.removeScheduleCard(scheduleCardIdx);
//     res.status(200).send({
//       status: 200,
//       message: '스케줄 카드 삭제 성공',
//       data: scheduleCardIdx,
//     });
//   } catch (err) {
//     next(err);
//   }
// }
// // async getAllDocument(req: Request, res: Response, next: NextFunction) {
// //   try {
// //     const documents = await documentService.findAllDocuments(
// //       Number(req.params.channel_idx)
// //     );
// //     res.status(200).send({
// //       status: 200,
// //       message: '채널별 문서 목록 조회 성공',
// //       data: documents,
// //     });
// //   } catch (err) {
// //     next(err);
// //   }
// // }
