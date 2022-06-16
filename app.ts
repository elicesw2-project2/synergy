import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import * as path from 'path';
import webSocket from './socket';

import { chatRouter } from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const server: http.Server = http.createServer(app);
webSocket(server);

app.get('/', (req: any, res: any) => {
  res.send('형욱 바보');
});

app.get('/chat', (req: any, res: any) => {
  res.sendFile(path.resolve('./chat.html'));
});

app.use('/chatrooms', chatRouter);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
