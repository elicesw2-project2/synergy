// eslint-disable-next-line import/no-import-module-exports
import { Server } from 'socket.io';
import * as http from 'http';

const webSocket = (server: http.Server) => {
  const io = new Server(server);

  const users = [];

  function countRoom(roomIdx: string) {
    return io.sockets.adapter.rooms.get(roomIdx)?.size;
  }

  // 소켓 연결
  io.on('connection', (socket: any) => {
    console.log('connected!');

    socket.on('enter_room', (roomIdx: string) => {
      socket.join(roomIdx);
      console.log(`${roomIdx} 입장`);
      //socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName)); // 하나의 소켓에만 메시지 보냄
      // io.sockets.emit("room_change", publicRooms()); // 메시지를 모든 소켓에 보냄
    });

    //socket.emit으로 현재 연결한 상대에게 신호를 보냄.
    socket.emit('usercount', io.engine.clientsCount);

    // 메시지 수신
    socket.on('message', function (message: any) {
      console.log(message);
      // io.emit으로 연결된 모든 소켓들에 신호를 보냄
      io.emit('message', `${socket.nickname}: ${message}`);
    });

    socket.on(
      'nickname',
      (nickname: string) => (socket['nickname'] = nickname)
    );

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
