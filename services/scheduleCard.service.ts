import { getAll, scheduleCardInfo, create } from '../model/scheduleCard.model';

export async function findAllScheduleCard() {
  return await getAll();
}

export async function createScheduleCard(scheduleCardInfo: scheduleCardInfo) {
  return await create(scheduleCardInfo);
}
