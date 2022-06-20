import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

import workspaceRouter from './routes/workspace.router';
import imageRouter from './routes/image.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use('/', routes);
app.use('/workspaces', workspaceRouter);
app.use('/image', imageRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('형욱 바보');
});

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
