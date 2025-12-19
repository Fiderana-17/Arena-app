import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Medal, Award, Search, ChevronUp, ChevronDown, Minus } from "lucide-react";

interface Player {
  rank: number;
  previousRank: number;
  username: string;
  avatar: string;
  country: string;
  wins: number;
  losses: number;
  points: number;
  winRate: number;
  mainGame: string;
}

const allPlayers: Player[] = [
  { rank: 1, previousRank: 1, username: "ShadowKiller", avatar: "https://i.pravatar.cc/150?img=1", country: "🇫🇷", wins: 145, losses: 15, points: 12450, winRate: 91, mainGame: "Valorant" },
  { rank: 2, previousRank: 3, username: "NightWolf", avatar: "https://i.pravatar.cc/150?img=2", country: "🇩🇪", wins: 132, losses: 28, points: 11280, winRate: 82, mainGame: "CS2" },
  { rank: 3, previousRank: 2, username: "CyberPhoenix", avatar: "https://i.pravatar.cc/150?img=3", country: "🇪🇸", wins: 128, losses: 32, points: 10900, winRate: 80, mainGame: "LoL" },
  { rank: 4, previousRank: 5, username: "VortexBlade", avatar: "https://i.pravatar.cc/150?img=4", country: "🇫🇷", wins: 115, losses: 35, points: 9950, winRate: 77, mainGame: "Valorant" },
  { rank: 5, previousRank: 4, username: "StormRider", avatar: "https://i.pravatar.cc/150?img=5", country: "🇬🇧", wins: 112, losses: 38, points: 9820, winRate: 75, mainGame: "Apex" },
  { rank: 6, previousRank: 7, username: "BlazeFury", avatar: "https://i.pravatar.cc/150?img=6", country: "🇮🇹", wins: 105, losses: 45, points: 8750, winRate: 70, mainGame: "Fortnite" },
  { rank: 7, previousRank: 6, username: "IceBreaker", avatar: "https://i.pravatar.cc/150?img=7", country: "🇵🇱", wins: 98, losses: 52, points: 8200, winRate: 65, mainGame: "LoL" },
  { rank: 8, previousRank: 8, username: "ThunderStrike", avatar: "https://i.pravatar.cc/150?img=8", country: "🇧🇪", wins: 95, losses: 55, points: 7900, winRate: 63, mainGame: "CS2" },
  { rank: 9, previousRank: 11, username: "NeonRacer", avatar: "https://i.pravatar.cc/150?img=9", country: "🇳🇱", wins: 88, losses: 62, points: 7450, winRate: 59, mainGame: "Rocket League" },
  { rank: 10, previousRank: 9, username: "DarkMatter", avatar: "https://i.pravatar.cc/150?img=10", country: "🇨🇭", wins: 85, losses: 65, points: 7100, winRate: 57, mainGame: "Valorant" },
];

const Rankings = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = allPlayers.filter((player) =>
    player.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-amber-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
    }
  };

  const getRankChange = (current: number, previous: number) => {
    const diff = previous - current;
    if (diff > 0) {
      return (
        <div className="flex items-center gap-1 text-emerald-400">
          <ChevronUp className="w-4 h-4" />
          <span className="text-xs">{diff}</span>
        </div>
      );
    } else if (diff < 0) {
      return (
        <div className="flex items-center gap-1 text-destructive">
          <ChevronDown className="w-4 h-4" />
          <span className="text-xs">{Math.abs(diff)}</span>
        </div>
      );
    }
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getRowStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border-l-4 border-l-amber-400";
      case 2:
        return "bg-gradient-to-r from-slate-400/20 via-slate-400/10 to-transparent border-l-4 border-l-slate-300";
      case 3:
        return "bg-gradient-to-r from-amber-700/20 via-amber-700/10 to-transparent border-l-4 border-l-amber-600";
      default:
        return "hover:bg-muted/50";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold">Classement</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Découvrez les meilleurs joueurs de la communauté Arena Gaming.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un joueur..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Rankings Table */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Classement Global
              </CardTitle>
              <Badge variant="upcoming">{filteredPlayers.length} joueurs</Badge>
            </CardHeader>
            <CardContent>
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 text-sm text-muted-foreground uppercase tracking-wider border-b border-border">
                <div className="col-span-1">Rang</div>
                <div className="col-span-4">Joueur</div>
                <div className="col-span-2">Jeu principal</div>
                <div className="col-span-2 text-center">V/D</div>
                <div className="col-span-1 text-center">WR%</div>
                <div className="col-span-2 text-right">Points</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {filteredPlayers.map((player) => (
                  <div
                    key={player.rank}
                    className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center transition-all duration-300 ${getRowStyle(player.rank)}`}
                  >
                    {/* Rank */}
                    <div className="col-span-1 flex items-center gap-2">
                      {getRankIcon(player.rank)}
                      {getRankChange(player.rank, player.previousRank)}
                    </div>

                    {/* Player */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={player.avatar}
                          alt={player.username}
                          className="w-12 h-12 rounded-full object-cover border-2 border-border"
                        />
                        <span className="absolute -bottom-1 -right-1 text-lg">{player.country}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{player.username}</p>
                        <p className="text-sm text-muted-foreground md:hidden">{player.mainGame}</p>
                      </div>
                    </div>

                    {/* Main Game */}
                    <div className="hidden md:block col-span-2">
                      <Badge variant="outline">{player.mainGame}</Badge>
                    </div>

                    {/* W/L */}
                    <div className="col-span-2 text-center">
                      <span className="text-emerald-400">{player.wins}V</span>
                      <span className="text-muted-foreground mx-1">-</span>
                      <span className="text-destructive">{player.losses}D</span>
                    </div>

                    {/* Win Rate */}
                    <div className="col-span-1 text-center">
                      <span className={player.winRate >= 70 ? "text-emerald-400" : player.winRate >= 50 ? "text-primary" : "text-destructive"}>
                        {player.winRate}%
                      </span>
                    </div>

                    {/* Points */}
                    <div className="col-span-2 text-right">
                      <span className="font-display text-xl font-bold text-primary">{player.points.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground ml-1">pts</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPlayers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucun joueur trouvé</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rankings;
