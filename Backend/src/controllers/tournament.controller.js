import { prisma } from '../prisma/index.js';

export const createTournament = async (req, res) => {
  try {
    const { name, game, prize, maxTeams, format } = req.body;
    const tournament = await prisma.tournament.create({
      data: {
        name,
        game,
        prize,
        maxTeams,
        format: format || 'SINGLE_ELIM',
        creatorId: req.user.id,
      },
    });
    res.status(201).json(tournament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTournaments = async (req, res) => {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: {
        creator: { select: { username: true } },
        _count: { select: { teams: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await prisma.tournament.findUnique({
      where: { id: parseInt(id) },
      include: {
        creator: true,
        teams: {
          include: {
            team: {
              include: { captain: true }
            }
          }
        },
        matches: true,
        rankings: {
          orderBy: { position: 'asc' },
          include: { team: true }
        }
      },
    });
    if (!tournament) return res.status(404).json({ error: 'Tournament not found' });
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
