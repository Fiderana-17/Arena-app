import express from 'express';
import { createTeam, getMyTeams, getTeamMembers } from '../controllers/team.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/me', getMyTeams);
router.post('/', createTeam);
router.get('/:teamId/members', authenticateToken, getTeamMembers);

export default router;
