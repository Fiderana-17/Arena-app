import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TournamentCard, { Tournament } from "@/components/TournamentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Trophy, Calendar, Gamepad2 } from "lucide-react";

const allTournaments: Tournament[] = [
  {
    id: "1",
    name: "Valorant Champions League",
    game: "Valorant",
    gameImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop",
    date: "25 Dec 2024",
    participants: 48,
    maxParticipants: 64,
    prizePool: "5,000€",
    status: "upcoming",
    format: "5v5",
  },
  {
    id: "2",
    name: "League of Legends Open",
    game: "LoL",
    gameImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop",
    date: "En cours",
    participants: 32,
    maxParticipants: 32,
    prizePool: "3,000€",
    status: "live",
    format: "5v5",
  },
  {
    id: "3",
    name: "CS2 Winter Cup",
    game: "CS2",
    gameImage: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&auto=format&fit=crop",
    date: "30 Dec 2024",
    participants: 12,
    maxParticipants: 16,
    prizePool: "2,500€",
    status: "upcoming",
    format: "5v5",
  },
  {
    id: "4",
    name: "Fortnite Solo Championship",
    game: "Fortnite",
    gameImage: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&auto=format&fit=crop",
    date: "Terminé",
    participants: 100,
    maxParticipants: 100,
    prizePool: "1,500€",
    status: "completed",
    format: "Solo",
  },
  {
    id: "5",
    name: "Rocket League 2v2 Arena",
    game: "Rocket League",
    gameImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
    date: "28 Dec 2024",
    participants: 20,
    maxParticipants: 32,
    prizePool: "2,000€",
    status: "upcoming",
    format: "2v2",
  },
  {
    id: "6",
    name: "Apex Legends Trio Cup",
    game: "Apex",
    gameImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop",
    date: "En cours",
    participants: 60,
    maxParticipants: 60,
    prizePool: "4,000€",
    status: "live",
    format: "3v3",
  },
];

const games = ["Tous", "Valorant", "LoL", "CS2", "Fortnite", "Rocket League", "Apex"];
const statuses = ["Tous", "À venir", "En direct", "Terminé"];

const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("Tous");
  const [selectedStatus, setSelectedStatus] = useState("Tous");

  const filteredTournaments = allTournaments.filter((tournament) => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === "Tous" || tournament.game === selectedGame;
    const matchesStatus =
      selectedStatus === "Tous" ||
      (selectedStatus === "À venir" && tournament.status === "upcoming") ||
      (selectedStatus === "En direct" && tournament.status === "live") ||
      (selectedStatus === "Terminé" && tournament.status === "completed");

    return matchesSearch && matchesGame && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold">Tournois</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Découvrez tous les tournois disponibles et inscrivez-vous pour compétitionner.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un tournoi..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Game Filter */}
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-1 flex-wrap">
                  {games.map((game) => (
                    <Badge
                      key={game}
                      variant={selectedGame === game ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => setSelectedGame(game)}
                    >
                      {game}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-1">
                  {statuses.map((status) => (
                    <Badge
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Grid */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          {filteredTournaments.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                {filteredTournaments.length} tournoi{filteredTournaments.length > 1 ? "s" : ""} trouvé{filteredTournaments.length > 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTournaments.map((tournament, index) => (
                  <div
                    key={tournament.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TournamentCard tournament={tournament} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Aucun tournoi trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Modifiez vos filtres ou revenez plus tard pour de nouveaux tournois.
              </p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedGame("Tous"); setSelectedStatus("Tous"); }}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tournaments;
