import { RequestPaymentConfiguration } from '@aws-sdk/client-s3';
import {
  getAll,
  scheduleCardInfo,
  create,
  getScheduleCardById,
  remove,
} from '../model/scheduleCard.model';
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

export async function removeScheduleCard(schedulecard_idx: Number) {
  return await remove(schedulecard_idx);
}
