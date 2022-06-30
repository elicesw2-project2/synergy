import { Request, Response, NextFunction } from 'express';
import findAllScheduleCard from '../services/scheduleCard.service';

async function getAllScheduleCards(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const scheduleCards = await findAllScheduleCard();
    res.status(200).send({
      status: 200,
      message: '모든 스케줄 조회 성공',
      data: scheduleCards,
    });
  } catch (err) {
    next(err);
  }
}

export default getAllScheduleCards;
