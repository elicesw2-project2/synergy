import bodyParser from 'body-parser';
import * as http from 'http';
import * as path from 'path';
import webSocket from './socket';

import { chatRouter } from './routes';
import express, { Request, Response } from 'express';

import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const server: http.Server = http.createServer(app);
webSocket(server);

app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('형욱 바보');
});

app.get('/chat', (req: any, res: any) => {
  res.sendFile(path.resolve('./chat.html'));
});

app.use('/chatrooms', chatRouter);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);
