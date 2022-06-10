import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: any, res: any) => {
  res.send('형욱 바보');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
