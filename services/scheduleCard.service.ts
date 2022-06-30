import { RequestPaymentConfiguration } from '@aws-sdk/client-s3';
import { getAll, scheduleCardInfo, create } from '../model/scheduleCard.model';

export async function findAllScheduleCard() {
  return await getAll();
  // scheduleCards.map();
}

export async function createScheduleCard(scheduleCardInfo: scheduleCardInfo) {
  return await create(scheduleCardInfo);
}
