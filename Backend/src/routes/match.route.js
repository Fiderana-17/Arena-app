import express from 'express';
import { generateTournamentBracket, updateMatchResult, getTournamentMatches, createMatch } from '../controllers/match.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateToken);

router.post('/tournaments/:tournamentId/bracket', requireAdmin, generateTournamentBracket);
router.post('/:matchId/result', requireAdmin, updateMatchResult);
router.get('/tournaments/:tournamentId', getTournamentMatches);
router.post('/', requireAdmin, createMatch); // Nouvelle route pour créer un match individuel

export default router;
