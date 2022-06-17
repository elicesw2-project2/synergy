import express, { Router } from 'express';
import { chatmessageController } from '../controllers/chatmessage.controller';

const chatmessageRouter: Router = express.Router();

// 채팅방별 메시지 목록 조회
chatmessageRouter.get('/:room_idx', chatmessageController.getAllChatMessages);

// 채팅 메시지 등록
chatmessageRouter.post('/', chatmessageController.addChatMessage);

// 채팅 메시지 수정
// chatmessageRouter.patch('/', chatmessageController.updateChatMessage);

// 채팅 메시지 삭제
// chatmessageRouter.delete('/', chatmessageController.deleteChatMessage);

export { chatmessageRouter };
