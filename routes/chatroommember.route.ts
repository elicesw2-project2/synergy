import express, { Router } from 'express';
import { chatroommemberController } from '../controllers/chatroommember.controller';
import { loginRequired } from '../middlewares/login.required';
const chatroommemberRouter: Router = express.Router();

// 채팅방 멤버 목록 조회
chatroommemberRouter.get(
  '/:room_idx',
  loginRequired,
  chatroommemberController.getMemberByRoomId
);

// 채팅방 멤버 추가
chatroommemberRouter.post(
  '/',
  loginRequired,
  chatroommemberController.addMember
);

// 채팅방 나가기
chatroommemberRouter.delete(
  '/',
  loginRequired,
  chatroommemberController.deleteMember
);

export { chatroommemberRouter };
