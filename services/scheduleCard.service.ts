import getAll from '../model/scheduleCard.model';

async function findAllScheduleCard() {
  return await getAll();
}

export default findAllScheduleCard;
