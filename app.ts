import express, { Request, Response } from 'express';
import authRouter from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 3000;

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('형욱 바보');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
