import { Request, Response, NextFunction } from 'express';
import * as scheduleCardService from '../services/scheduleCard.service';

//전체 목록 조회
export async function getAllScheduleCards(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const scheduleCards = await scheduleCardService.findAllScheduleCard(
      Number(req.params.channel_idx)
    );
    res.status(200).send({
      status: 200,
      message: '모든 스케줄 조회 성공',
      data: scheduleCards,
    });
  } catch (err) {
    next(err);
  }
}

// 상세 조회
export async function getScheduleCardById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const scheduleCard = await scheduleCardService.findScheduleCardById(
    Number(req.params.schedulecard_idx)
  );
  res.status(200).send({
    status: 200,
    message: '아이디로 스케줄 조회 성공',
    data: scheduleCard,
  });
}
// 등록
export async function addScheduleCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_idx: number = Number(req.currentUserIdx);
    const scheduleCard = await scheduleCardService.createScheduleCard(
      user_idx,
      req.body
    );
    res.status(201).send({
      status: 201,
      message: '스케줄카드 등록 성공',
      data: scheduleCard,
    });
  } catch (err) {
    next(err);
  }
}
