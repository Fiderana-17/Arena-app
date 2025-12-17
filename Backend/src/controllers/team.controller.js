import { prisma } from '../prisma/index.js';

export const createTeam = async (req, res) => {
  try {
    const { name, game } = req.body;
    const team = await prisma.team.create({
      data: {
        name,
        game,
        captainId: req.user.id,
      },
      include: { captain: true }
    });
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMyTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      where: { captainId: req.user.id },
      include: {
        players: true,
        registrations: {
          include: { tournament: true }
        }
      }
    });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamMembers = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await prisma.team.findUnique({
      where: { id: Number(teamId) },
      include: {
        captain: {
          select: { id: true, username: true, email: true, role: true }
        },
        players: true
      }
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({
      id: team.id,
      name: team.name,
      game: team.game,
      captain: team.captain,
      players: team.players
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, game } = req.body;
    const team = await prisma.team.update({
      where: { id: Number(teamId), captainId: req.user.id },
      data: { name, game },
      include: { captain: true, players: true }
    });
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await prisma.team.findUnique({
      where: { id: Number(teamId), captainId: req.user.id },
      include: { players: true, registrations: true, rankings: true }
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found or not yours' });
    }

    // Supprimer les dépendances
    await prisma.player.deleteMany({
      where: { teamId: Number(teamId) }
    });

    await prisma.registration.deleteMany({
      where: { teamId: Number(teamId) }
    });

    await prisma.ranking.deleteMany({
      where: { teamId: Number(teamId) }
    });

    // Maintenant supprimer l'équipe
    await prisma.team.delete({
      where: { id: Number(teamId) }
    });

    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};