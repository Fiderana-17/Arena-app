import { prisma } from '../prisma/index.js';

export const joinTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name } = req.body; // nom du joueur (pseudo in-game)

    const team = await prisma.team.findUnique({ where: { id: Number(teamId) } });
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const player = await prisma.player.create({
  data: {
    name: req.user.username,
    teamId: team.id,
    userId: req.user.id
  },
});


    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const leaveTeam = async (req, res) => {
  try {
    const { playerId } = req.params;

    // Option A : vérifier que ce player appartient bien à l'utilisateur connecté
    // si tu as ajouté userId dans Player. Sinon, on laisse simple.

    const player = await prisma.player.findUnique({
      where: { id: Number(playerId) }
    });

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    await prisma.player.delete({
      where: { id: Number(playerId) }
    });

    res.json({ message: 'Player left the team successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        teams: {
          include: { team: true }
        },
        tournaments: {
          include: { tournament: true }
        }
      }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { username, email }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
