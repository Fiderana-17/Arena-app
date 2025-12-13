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
