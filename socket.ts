// eslint-disable-next-line import/no-import-module-exports
import { Server } from 'socket.io';
import * as http from 'http';

const webSocket = (server: http.Server) => {
  const io = new Server(server);

  // 소켓 연결
  io.on('connection', (socket: any) => {
    console.log('connected!');

    socket.on('message', function (message: any) {
      console.log(message);
      socket.emit('message', message);
    });

    // 소켓 나가기
    socket.on('disconnecting', () => {
      console.log('bye!');
    });

    // 소켓 연결 에러
    socket.on('error', (error: any) => {
      console.log(error);
    });
  });
};

export default webSocket;
