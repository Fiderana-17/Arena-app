import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords } from "lucide-react";

interface Match {
  id: string;
  player1: {
    name: string;
    avatar: string;
    score: number;
  };
  player2: {
    name: string;
    avatar: string;
    score: number;
  };
  status: "live" | "completed" | "upcoming";
  time: string;
  tournament: string;
}

interface RecentMatchesProps {
  matches: Match[];
}

const RecentMatches = ({ matches }: RecentMatchesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-primary" />
          Matchs récents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Player 1 */}
              <div className="flex-1 flex items-center gap-3">
                <img
                  src={match.player1.avatar}
                  alt={match.player1.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-border"
                />
                <div className="min-w-0">
                  <p className="font-semibold truncate">{match.player1.name}</p>
                  <p className="text-xs text-muted-foreground">{match.tournament}</p>
                </div>
              </div>

              {/* Score */}
              <div className="flex items-center gap-3 px-4">
                <span
                  className={`font-display text-2xl font-bold ${
                    match.player1.score > match.player2.score ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {match.player1.score}
                </span>
                <div className="flex flex-col items-center">
                  {match.status === "live" ? (
                    <Badge variant="live" className="text-[10px] px-2">
                      LIVE
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">VS</span>
                  )}
                  <span className="text-[10px] text-muted-foreground mt-1">{match.time}</span>
                </div>
                <span
                  className={`font-display text-2xl font-bold ${
                    match.player2.score > match.player1.score ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {match.player2.score}
                </span>
              </div>

              {/* Player 2 */}
              <div className="flex-1 flex items-center justify-end gap-3">
                <div className="min-w-0 text-right">
                  <p className="font-semibold truncate">{match.player2.name}</p>
                  <p className="text-xs text-muted-foreground">{match.tournament}</p>
                </div>
                <img
                  src={match.player2.avatar}
                  alt={match.player2.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-border"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMatches;
