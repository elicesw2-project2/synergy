import db from './db';

async function findAll() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM synergy.schedulecard;', (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

export default findAll;
