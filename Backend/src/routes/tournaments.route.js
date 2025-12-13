import express from 'express';
import { createTournament, getTournaments, getTournament } from '../controllers/tournament.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getTournaments);
router.get('/:id', getTournament);

router.post('/', requireAdmin, createTournament);

export default router;
