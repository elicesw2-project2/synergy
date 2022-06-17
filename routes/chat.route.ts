import express, { Router } from 'express';
import { chatController } from '../controllers/chat.controller';

const chatRouter: Router = express.Router();

/* GET users listing. */

// 채팅방 목록 조회
chatRouter.get('/:workspace_idx', chatController.getAllRooms);

// 채팅방 등록
chatRouter.post('/', chatController.addRooms);

export { chatRouter };
