import { Router } from 'express';
import { invitationController } from '../controllers/invitation.controller';
import { loginRequired } from '../middlewares/login.required';

const router = Router();

//  초대링크 정보 요청 GET  /invitation/:link
router.get('/:link', loginRequired, invitationController.getInvitation);

// 초대링크 생성 POST /invitation
router.post('/', loginRequired, invitationController.addInvitation);

// 초대링크 갱신 PATCH /invitation/:workspace_idx
router.patch(
  '/:workspace_idx',
  loginRequired,
  invitationController.setInvitation
);

export default router;
