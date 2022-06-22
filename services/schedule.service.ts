import findAll from '../model/schedule.model';

const findAllSchedules = async () => {
  const scheduls = await findAll();
  return scheduls;
};

export default findAllSchedules;
