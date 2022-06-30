import { RequestPaymentConfiguration } from '@aws-sdk/client-s3';
import { getAll, scheduleCardInfo, create } from '../model/scheduleCard.model';

export async function findAllScheduleCard() {
  const scheduleCards = await getAll();
  let scheduleCardsArr: scheduleCardInfo[] = [];
  let todo: scheduleCardInfo[] = [];
  let process: scheduleCardInfo[] = [];
  let done: scheduleCardInfo[] = [];
  scheduleCards.map((data) => {
    if (data.category == 'todo') {
      todo.push(data);
    } else if (data.category == 'process') {
      process.push(data);
    } else {
      done.push(data);
    }
  });
  return [todo, process, done];
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

  return scheduleCards;
}

export async function createScheduleCard(scheduleCardInfo: scheduleCardInfo) {
  return await create(scheduleCardInfo);
}
