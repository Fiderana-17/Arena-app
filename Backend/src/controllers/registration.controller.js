import { prisma } from '../prisma/index.js';

export const registerTeamToTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await prisma.tournament.findUnique({
      where: { id: parseInt(tournamentId) },
      include: { teams: true }
    });

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    if (tournament.status !== 'REGISTERING') {
      return res.status(400).json({ error: 'Registration closed' });
    }

    if (tournament.teams.length >= tournament.maxTeams) {
      return res.status(400).json({ error: 'Tournament full' });
    }

    const registration = await prisma.registration.create({
      data: {
        teamId: req.user.teamId || req.body.teamId, // Captain auto-register
        tournamentId: parseInt(tournamentId)
      },
      include: {
        team: { include: { captain: true } },
        tournament: true
      }
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTournamentRegistrations = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const registrations = await prisma.registration.findMany({
      where: { tournamentId: parseInt(tournamentId) },
      include: {
        team: {
          include: {
            captain: true,
            players: true
          }
        }
      },
      orderBy: { registeredAt: 'desc' }
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
