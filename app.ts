import express, { Request, Response } from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

// application/json 형태의 데이터를 인식할 수 있게 함.
app.use(express.json());

app.use('/', routes);
app.get('/', (req: Request, res: Response) => {
  res.send('형욱 바보');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
