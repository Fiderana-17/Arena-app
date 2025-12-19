import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface Tournament {
  id: string;
  name: string;
  game: string;
  gameImage: string;
  date: string;
  participants: number;
  maxParticipants: number;
  prizePool: string;
  status: "upcoming" | "live" | "completed";
  format: string;
}

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  const statusConfig = {
    upcoming: { label: "À venir", variant: "upcoming" as const },
    live: { label: "En direct", variant: "live" as const },
    completed: { label: "Terminé", variant: "success" as const },
  };

  const status = statusConfig[tournament.status];

  return (
    <Card className="group overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_40px_hsl(187_100%_50%/0.15)] hover:border-primary/30">
      {/* Game Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={tournament.gameImage}
          alt={tournament.game}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <Badge variant={status.variant} className="absolute top-3 right-3">
          {status.label}
        </Badge>
      </div>

      <CardContent className="p-5">
        {/* Tournament Name */}
        <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {tournament.name}
        </h3>

        {/* Game & Format */}
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            {tournament.game}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {tournament.format}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{tournament.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>
              {tournament.participants}/{tournament.maxParticipants} joueurs
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-accent font-semibold">{tournament.prizePool}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-500"
              style={{
                width: `${(tournament.participants / tournament.maxParticipants) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/tournaments/${tournament.id}`}>
          <Button
            variant={tournament.status === "upcoming" ? "hero" : "outline"}
            className="w-full group/btn"
          >
            {tournament.status === "upcoming" ? "S'inscrire" : "Voir détails"}
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TournamentCard;
