// import * as scheduleCardModel from '../model/schedule.model';

// export const findAllSchedules = async () => {
//   const scheduleCards = await scheduleCardModel.findAll();
//   console.log(scheduleCards);

//   return scheduleCards;
// };

// export const findScheduleCardById = async (scheduleCardIdx: Number) => {
//   const scheduleCard = await scheduleCardModel.findById(scheduleCardIdx);
//   return scheduleCard;
// };

// export const setScheduleCard = async (
//   scheduleCardIdx: Number,
//   scheduleCardInfo: {
//     title: string;
//     category: string;
//     content: string;
//     duedate: Date;
//   }
// ) => {
//   const scheduleCard = await scheduleCardModel.update(
//     scheduleCardIdx,
//     scheduleCardInfo
//   );
//   return scheduleCard;
// };

// export const addScheduleCard = async (
//   scheduleCardIdx: Number,
//   scheduleCardInfo: {
//     title: string;
//     category: string;
//     content: string;
//     duedate: Date;
//   }
// ) => {
//   const scheduleCard = await scheduleCardModel.create(
//     scheduleCardIdx,
//     scheduleCardInfo
//   );
//   return scheduleCard;
// };

// export const removeScheduleCard = async (scheduleCardIdx: Number) => {
//   const scheduleCard = await scheduleCardModel.remove(scheduleCardIdx);
//   return scheduleCard;
// };
// // 스케줄 전체 조회할 떄 정렬해서 보내주면 => 카테고리별로 보낼 필요가 없는거지
// // 데이터 안에 카테고리 리스트 3개를 나눠서 3개의 리스트로 전송
