import { RequestPaymentConfiguration } from '@aws-sdk/client-s3';
import {
  getAll,
  scheduleCardInfo,
  create,
  getScheduleCardById,
  update,
  remove,
  newScheduleCard,
} from '../model/scheduleCard.model';
import { CustomError } from '../middlewares/customError';
interface objType {
  todo: scheduleCardInfo[];
  process: scheduleCardInfo[];
  done: scheduleCardInfo[];
}
export async function findAllScheduleCard(channelIdx: Number) {
  const scheduleCards = await getAll(channelIdx);
  let filteredObj: objType = {
    todo: [],
    process: [],
    done: [],
  };
  scheduleCards.map((data) => {
    if (data.category == 'todo') {
      filteredObj.todo.push(data);
    } else if (data.category == 'process') {
      filteredObj.process.push(data);
    } else {
      filteredObj.done.push(data);
    }
  });
  return filteredObj;
  // console.log(scheduleCards);
  // const todo: scheduleCardInfo[] = await Promise.all(
  //   scheduleCards.filter((data) => {
  //     data.category == 'todo';
  //   })
  // );

  // const done = scheduleCards.filter((data) => {
  //   data.category == 'done';
  // });
  // const process = scheduleCards.filter((data) => {
  //   data.category == 'process';
  // });
  // scheduleCardsArr.push(todo);
  // console.log(scheduleCardsArr);
}
export async function findScheduleCardById(schedulecardIdx: Number) {
  return await getScheduleCardById(schedulecardIdx);
}
export async function createScheduleCard(
  user_idx: Number,
  scheduleCardInfo: scheduleCardInfo
) {
  return await create(user_idx, scheduleCardInfo);
}

export async function updateScheduleCard(
  scheduleCard_idx: Number,
  currentUserIdx: Number,
  scheduleCardInfo: scheduleCardInfo
) {
  const getById: scheduleCardInfo = await getScheduleCardById(scheduleCard_idx);
  if (currentUserIdx != getById.user_idx) {
    throw new CustomError(400, '작성자가 아닙니다.');
  }
  return await update(scheduleCard_idx, currentUserIdx, scheduleCardInfo);
}

export async function removeScheduleCard(schedulecard_idx: Number) {
  return await remove(schedulecard_idx);
}
