import db from './db';

export async function findAll() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM synergy.schedulecard;', (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

export async function findById(scheduleCardIdx: Number) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM synergy.schedulecard WHERE schedulecard_idx=?',
      scheduleCardIdx,
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export async function create(
  scheduleCardIdx: Number,
  scheduleCardInfo: {
    title: String;
    category: String;
    content: String;
    duedate: Date;
  }
) {
  return new Promise((resolve, reject) => {
    const { title, category, content, duedate } = scheduleCardInfo;
    db.query(
      'INSERT INTO schedulecard SET title=?, category=?, content=?, duedate=?',
      [title, category, content, duedate],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({ scheduleCard_idx: scheduleCardIdx, ...scheduleCardInfo });
      }
    );
  });
}

export async function update(
  scheduleCardIdx: Number,
  scheduleCardInfo: {
    title: String;
    category: String;
    content: String;
    duedate: Date;
  }
) {
  return new Promise((resolve, reject) => {
    const { title, category, content, duedate } = scheduleCardInfo;
    db.query(
      'UPDATE schedulecard SET title=?, category=?, content=?, duedate=?  WHERE schedulecard_idx=?',
      [title, category, content, duedate, scheduleCardIdx],
      (err, result) => {
        return err
          ? reject(err)
          : resolve({ scheduleCard_idx: scheduleCardIdx, ...scheduleCardInfo });
      }
    );
  });
}

export async function remove(scheduleCardIdx: Number) {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE from schedulecard WHERE schedulecard_idx=?',
      scheduleCardIdx,
      (err, result) => {
        return err
          ? reject(err)
          : resolve({ scheduleCard_idx: scheduleCardIdx });
      }
    );
  });
}
