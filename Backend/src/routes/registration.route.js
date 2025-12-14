import express from 'express';
import { registerTeamToTournament, getTournamentRegistrations } from '../controllers/registrationController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/tournaments/:tournamentId/register', registerTeamToTournament);
router.get('/tournaments/:tournamentId/registrations', getTournamentRegistrations);

export default router;
