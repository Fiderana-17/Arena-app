import express from 'express';
import { joinTeam, leaveTeam, getProfile, updateProfile } from '../controllers/player.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Le joueur doit être connecté pour rejoindre une team
router.use(authenticateToken);

router.post('/teams/:teamId/join', joinTeam);
router.delete('/:playerId/leave', leaveTeam);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;
