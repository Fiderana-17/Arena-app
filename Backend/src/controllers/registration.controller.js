import { prisma } from '../prisma/index.js';

export const registerTeamToTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { teamId } = req.body;

    if (!teamId) {
      return res.status(400).json({ error: 'teamId is required' });
    }

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

    // Vérifier que l'utilisateur est le capitaine de l'équipe
    const team = await prisma.team.findUnique({
      where: { id: Number(teamId) }
    });

    if (!team || team.captainId !== req.user.id) {
      return res.status(403).json({ error: 'You are not the captain of this team' });
    }

    const registration = await prisma.registration.create({
      data: {
        teamId: Number(teamId),
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

export const unregisterTeamFromTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const registration = await prisma.registration.findFirst({
      where: {
        tournamentId: parseInt(tournamentId),
        team: { captainId: req.user.id }
      }
    });
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    await prisma.registration.delete({
      where: { id: registration.id }
    });
    res.json({ message: 'Unregistered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
