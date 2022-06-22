import { Request, Response } from 'express';
import findAllSchedules from '../services/schedule.service';

const getAllSchedules = async (res: Response, req: Request) => {
  try {
    const schedules = await findAllSchedules();
    res.status(200).send({
      status: 200,
      message: '채널 카테고리 목록 조회 성공',
      data: schedules,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default getAllSchedules;
