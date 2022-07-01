// eslint-disable-next-line import/no-import-module-exports
import { Server } from 'socket.io';
import * as http from 'http';
import path from 'path';

const webSocket = (server: http.Server) => {
  const io = new Server(server);
  const users = [];

  function countRoom(roomIdx: string) {
    return io.sockets.adapter.rooms.get(roomIdx)?.size;
  }

  // 소켓 연결
  io.on('connection', (socket: any) => {
    socket['nickname'] = 'Anonymous';
    socket['roomIdx'] = 0;
    console.log('connected!');

    socket.on('enter_room', (roomIdx: number, nickname: string) => {
      socket.join(roomIdx);
      socket['roomIdx'] = roomIdx;
      console.log(`${roomIdx}번방 입장`);
      socket.to(roomIdx).emit('welcome', nickname);
      // io.sockets.emit("room_change", publicRooms()); // 메시지를 모든 소켓에 보냄
    });

    //socket.emit으로 현재 연결한 상대에게 신호를 보냄.
    socket.emit('usercount', io.engine.clientsCount);

    // 메시지 수신
    socket.on(
      'message',
      function (message: string, nickname: string, roomIdx: number) {
        socket['nickname'] = nickname;
        console.log(`${socket.nickname}: ${message}`);
        // io.emit으로 연결된 모든 소켓들에 신호를 보냄
        // socket.to(roomIdx).emit('message', `${socket.nickname}: ${message}`);
        io.to(socket['roomIdx']).emit(
          'message',
          `${socket.nickname}: ${message}`
        );
      }
    );

    // 소켓 나가기
    socket.on('disconnecting', () => {
      console.log('bye!');
      io.to(socket['roomIdx']).emit(
        'disconnection',
        `${socket.nickname}님이 채팅방을 나가셨습니다.`
      );
    });

    // 소켓 연결 에러
    socket.on('error', (error: any) => {
      console.log(error);
    });
  });
};

export default webSocket;
