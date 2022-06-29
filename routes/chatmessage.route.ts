import express, { Router } from 'express';
import { chatmessageController } from '../controllers/chatmessage.controller';
import { loginRequired } from '../middlewares/login.required';

const chatmessageRouter: Router = express.Router();

// 채팅방별 메시지 목록 조회
chatmessageRouter.get('/:room_idx', chatmessageController.getAllChatMessages);

// 채팅 메시지 등록
chatmessageRouter.post(
  '/',
  loginRequired,
  chatmessageController.addChatMessage
);

// 채팅 메시지 수정
chatmessageRouter.patch('/:message_idx', chatmessageController.setChatMessage);

// 채팅 메시지 삭제
chatmessageRouter.delete('/:message_idx', chatmessageController.deleteMessage);

export { chatmessageRouter };
