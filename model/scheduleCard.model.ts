import db from './db';

async function getAll() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM schedulecard', (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

export default getAll;
