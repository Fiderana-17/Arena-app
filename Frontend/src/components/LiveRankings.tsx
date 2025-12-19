import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

interface Player {
  rank: number;
  username: string;
  avatar: string;
  wins: number;
  losses: number;
  points: number;
  winRate: number;
}

interface LiveRankingsProps {
  players: Player[];
}

const LiveRankings = ({ players }: LiveRankingsProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-slate-300" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-muted-foreground font-semibold">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-amber-500/20 to-amber-500/5 border-amber-500/30";
      case 2:
        return "bg-gradient-to-r from-slate-400/20 to-slate-400/5 border-slate-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-700/20 to-amber-700/5 border-amber-700/30";
      default:
        return "hover:bg-muted/50";
    }
  };

  return (
    <Card glow>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          Classement Live
        </CardTitle>
        <Badge variant="live">En direct</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {players.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center gap-4 p-3 rounded-lg border border-transparent transition-all duration-300 ${getRankStyle(player.rank)}`}
            >
              {/* Rank */}
              <div className="w-8 flex justify-center">{getRankIcon(player.rank)}</div>

              {/* Avatar */}
              <div className="relative">
                <img
                  src={player.avatar}
                  alt={player.username}
                  className="w-10 h-10 rounded-full object-cover border-2 border-border"
                />
                {player.rank <= 3 && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary-foreground">{player.rank}</span>
                  </div>
                )}
              </div>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{player.username}</p>
                <p className="text-xs text-muted-foreground">
                  {player.wins}V - {player.losses}D
                </p>
              </div>

              {/* Win Rate */}
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-primary">{player.winRate}%</p>
                <p className="text-xs text-muted-foreground">Win rate</p>
              </div>

              {/* Points */}
              <div className="text-right">
                <p className="font-display font-bold text-lg text-primary">{player.points}</p>
                <p className="text-xs text-muted-foreground">pts</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveRankings;
