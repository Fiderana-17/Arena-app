import { prisma } from '../prisma/index.js';

export const createTournament = async (req, res) => {
  try {
    const { name, game, prize, maxTeams, format } = req.body;
    const tournament = await prisma.tournament.create({
      data: {
        name,
        game,
        prize: String(prize), // Convertir en string
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

export const calculateRankings = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await prisma.tournament.findUnique({
      where: { id: parseInt(id) },
      include: {
        teams: { include: { team: true } },
        matches: { include: { team1: true, team2: true } }
      }
    });

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    // Calculer les points pour chaque équipe
    const teamScores = {};

    tournament.teams.forEach(registration => {
      teamScores[registration.teamId] = { team: registration.team, points: 0, wins: 0, losses: 0 };
    });

    tournament.matches.forEach(match => {
      if (match.status === 'COMPLETED') {
        if (match.team1Score > match.team2Score) {
          teamScores[match.team1Id].wins += 1;
          teamScores[match.team1Id].points += 3; // 3 points pour une victoire
          teamScores[match.team2Id].losses += 1;
        } else if (match.team2Score > match.team1Score) {
          teamScores[match.team2Id].wins += 1;
          teamScores[match.team2Id].points += 3;
          teamScores[match.team1Id].losses += 1;
        } else {
          // Match nul : 1 point chacun
          teamScores[match.team1Id].points += 1;
          teamScores[match.team2Id].points += 1;
        }
      }
    });

    // Trier les équipes par points décroissant, puis par victoires
    const sortedTeams = Object.values(teamScores).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.wins - a.wins;
    });

    // Supprimer les anciens rankings
    await prisma.ranking.deleteMany({
      where: { tournamentId: parseInt(id) }
    });

    // Créer les nouveaux rankings
    const rankings = [];
    for (let i = 0; i < sortedTeams.length; i++) {
      const ranking = await prisma.ranking.create({
        data: {
          tournamentId: parseInt(id),
          teamId: sortedTeams[i].team.id,
          position: i + 1,
          points: sortedTeams[i].points,
          wins: sortedTeams[i].wins,
          losses: sortedTeams[i].losses
        },
        include: { team: true }
      });
      rankings.push(ranking);
    }

    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, game, prize, maxTeams, format, status } = req.body;

    // Vérifier si le tournoi existe
    const existingTournament = await prisma.tournament.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingTournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    const tournament = await prisma.tournament.update({
      where: { id: parseInt(id) },
      data: {
        name,
        game,
        prize: prize ? String(prize) : undefined,
        maxTeams,
        format,
        status,
      },
    });
    res.json(tournament);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tournament.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Tournament deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
