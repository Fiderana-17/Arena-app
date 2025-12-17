import express from 'express';
import { createTournament, getTournaments, getTournament, updateTournament, deleteTournament, calculateRankings } from '../controllers/tournament.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getTournaments);
router.get('/:id', getTournament);
router.get('/:id/rankings', calculateRankings); // Nouvelle route pour calculer les rankings

router.post('/', requireAdmin, createTournament);
router.put('/:id', requireAdmin, updateTournament);
router.delete('/:id', requireAdmin, deleteTournament);

export default router;
