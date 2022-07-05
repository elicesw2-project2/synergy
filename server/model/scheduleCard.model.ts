import { rejects } from 'assert';
import db from './db';

export interface scheduleCardInfo {
  channel_idx: Number;
  title: String;
  category: String;
  content: String;
  due_date: Date;
  user_idx: Number;
}

//전체 조회
export async function getAll(channelIdx: Number): Promise<scheduleCardInfo[]> {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM schedulecard WHERE channel_idx = ?',
      channelIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}
//상세 조회
export async function getScheduleCardById(schedulecard_idx: Number) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM schedulecard WHERE schedulecard_idx = ?',
      schedulecard_idx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

//등록
export async function create(
  user_idx: Number,
  scheduleCardInfo: scheduleCardInfo
) {
  return new Promise((resolve, reject) => {
    let { channel_idx, title, category, content, due_date } = scheduleCardInfo;
    due_date = new Date(due_date);
    let create_date = new Date().toISOString().split('T')[0];
    db.query(
      'INSERT INTO schedulecard SET category=?,create_date=?, title=?, content=?, due_date=?, user_idx=?, channel_idx=?',
      [category, create_date, title, content, due_date, user_idx, channel_idx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({
              scheduleCard_idx: result.insertId,
              create_date,
              ...scheduleCardInfo,
            });
      }
    );
  });
}
