import { prisma } from '../prisma/index.js';

export const createMatch = async (req, res) => {
  try {
    const { tournamentId, team1Id, team2Id, round = 1 } = req.body;

    // Trouver le prochain matchNumber disponible pour ce round
    const existingMatches = await prisma.match.findMany({
      where: { tournamentId, round },
      select: { matchNumber: true }
    });

    const usedNumbers = existingMatches.map(m => m.matchNumber).sort((a, b) => a - b);
    let matchNumber = 1;
    for (const num of usedNumbers) {
      if (num === matchNumber) matchNumber++;
      else break;
    }

    const match = await prisma.match.create({
      data: {
        tournamentId,
        team1Id,
        team2Id,
        round,
        matchNumber,
        status: 'SCHEDULED'
      },
      include: { team1: true, team2: true, tournament: true }
    });

    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const generateTournamentBracket = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    
    // Supprimer les anciens matchs et rankings si ils existent
    await prisma.match.deleteMany({
      where: { tournamentId: parseInt(tournamentId) }
    });
    await prisma.ranking.deleteMany({
      where: { tournamentId: parseInt(tournamentId) }
    });
    
    // Récupérer équipes inscrites
    const registrations = await prisma.registration.findMany({
      where: { tournamentId: parseInt(tournamentId), status: 'CONFIRMED' },
      include: { team: true }
    });

    if (registrations.length < 2) {
      return res.status(400).json({ error: 'Minimum 2 teams required' });
    }

    // Générer bracket simple (1/4 finale → demi → finale)
    const matches = [];
    const teamCount = registrations.length;
    
    // Round 1
    for (let i = 0; i < teamCount; i += 2) {
      if (i + 1 < teamCount) {
        matches.push({
          tournamentId: parseInt(tournamentId),
          round: 1,
          matchNumber: Math.floor(i / 2) + 1,
          team1Id: registrations[i].teamId,
          team2Id: registrations[i + 1].teamId,
          status: 'SCHEDULED'
        });
      }
    }

    // Créer matchs
    await prisma.match.createMany({ data: matches });
    
    res.json({ 
      message: `${matches.length} matches generated (old matches deleted)`,
      matches 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMatchResult = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { team1Score, team2Score } = req.body;

    const match = await prisma.match.update({
      where: { id: parseInt(matchId) },
      data: {
        team1Score,
        team2Score,
        status: 'COMPLETED',
        playedAt: new Date(),
        winnerTeamId: team1Score > team2Score ? req.body.team1Id : req.body.team2Id
      },
      include: {
        tournament: true
      }
    });

    // Mettre à jour ranking auto
    await updateTournamentRankings(match.tournamentId);

    res.json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fonction pour mettre à jour les rankings automatiquement
const updateTournamentRankings = async (tournamentId) => {
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        teams: { include: { team: true } },
        matches: { include: { team1: true, team2: true } }
      }
    });

    if (!tournament) return;

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
      where: { tournamentId }
    });

    // Créer les nouveaux rankings
    for (let i = 0; i < sortedTeams.length; i++) {
      await prisma.ranking.create({
        data: {
          tournamentId,
          teamId: sortedTeams[i].team.id,
          position: i + 1,
          points: sortedTeams[i].points,
          wins: sortedTeams[i].wins,
          losses: sortedTeams[i].losses
        }
      });
    }
  } catch (error) {
    console.error('Error updating rankings:', error);
  }
};

export const getTournamentMatches = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const matches = await prisma.match.findMany({
      where: { tournamentId: parseInt(tournamentId) },
      orderBy: [{ round: 'asc' }, { matchNumber: 'asc' }]
    });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};