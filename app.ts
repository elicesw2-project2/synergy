import express from 'express';
import * as http from 'http';
import * as path from 'path';
import webSocket from './socket';

const app = express();
const port = process.env.PORT || 3000;

const server: http.Server = http.createServer(app);
webSocket(server);

app.get('/', (req: any, res: any) => {
  res.send('형욱 바보');
});

app.get('/chat', (req: any, res: any) => {
  res.sendFile(path.resolve('./chat.html'));
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
