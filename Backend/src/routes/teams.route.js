import express from 'express';
import { createTeam, getMyTeams, getTeamMembers, updateTeam, deleteTeam } from '../controllers/team.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/me', getMyTeams);
router.post('/', createTeam);
router.get('/:teamId/members', authenticateToken, getTeamMembers);
router.put('/:teamId', updateTeam);
router.delete('/:teamId', deleteTeam);

export default router;
