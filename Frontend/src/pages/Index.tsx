import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TournamentCard, { Tournament } from "@/components/TournamentCard";
import LiveRankings from "@/components/LiveRankings";
import RecentMatches from "@/components/RecentMatches";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Gamepad2, Zap, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const featuredTournaments: Tournament[] = [
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
];

const topPlayers = [
  { rank: 1, username: "ShadowKiller", avatar: "https://i.pravatar.cc/150?img=1", wins: 45, losses: 5, points: 2450, winRate: 90 },
  { rank: 2, username: "NightWolf", avatar: "https://i.pravatar.cc/150?img=2", wins: 42, losses: 8, points: 2280, winRate: 84 },
  { rank: 3, username: "CyberPhoenix", avatar: "https://i.pravatar.cc/150?img=3", wins: 38, losses: 12, points: 2100, winRate: 76 },
  { rank: 4, username: "VortexBlade", avatar: "https://i.pravatar.cc/150?img=4", wins: 35, losses: 15, points: 1950, winRate: 70 },
  { rank: 5, username: "StormRider", avatar: "https://i.pravatar.cc/150?img=5", wins: 32, losses: 18, points: 1820, winRate: 64 },
];

const recentMatches = [
  {
    id: "1",
    player1: { name: "ShadowKiller", avatar: "https://i.pravatar.cc/150?img=1", score: 3 },
    player2: { name: "NightWolf", avatar: "https://i.pravatar.cc/150?img=2", score: 1 },
    status: "live" as const,
    time: "En cours",
    tournament: "Valorant Champions",
  },
  {
    id: "2",
    player1: { name: "CyberPhoenix", avatar: "https://i.pravatar.cc/150?img=3", score: 2 },
    player2: { name: "VortexBlade", avatar: "https://i.pravatar.cc/150?img=4", score: 2 },
    status: "completed" as const,
    time: "Il y a 15 min",
    tournament: "LoL Open",
  },
  {
    id: "3",
    player1: { name: "StormRider", avatar: "https://i.pravatar.cc/150?img=5", score: 0 },
    player2: { name: "BlazeFury", avatar: "https://i.pravatar.cc/150?img=6", score: 3 },
    status: "completed" as const,
    time: "Il y a 1h",
    tournament: "CS2 Cup",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Plateforme de Tournois #1</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              <span className="block">Dominez</span>
              <span className="block bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
                l'Arena
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Rejoignez la compétition, affrontez les meilleurs joueurs et grimpez au sommet du classement mondial.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tournaments">
                <Button variant="hero" size="xl" className="group">
                  Voir les tournois
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button variant="outline" size="xl">
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <StatCard title="Joueurs actifs" value="12,450" icon={Users} trend={{ value: 12, positive: true }} />
            <StatCard title="Tournois" value="156" icon={Trophy} trend={{ value: 8, positive: true }} />
            <StatCard title="Matchs joués" value="45,892" icon={Gamepad2} />
            <StatCard title="Prize Pool Total" value="125K€" icon={Zap} />
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Tournois à la une</h2>
              <p className="text-muted-foreground">Inscrivez-vous aux prochaines compétitions</p>
            </div>
            <Link to="/tournaments">
              <Button variant="ghost" className="group">
                Voir tout
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTournaments.map((tournament, index) => (
              <div key={tournament.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <TournamentCard tournament={tournament} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rankings & Matches */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LiveRankings players={topPlayers} />
            <RecentMatches matches={recentMatches} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Prêt à rejoindre la compétition ?
            </h2>
            <p className="text-xl text-muted-foreground">
              Créez votre compte gratuitement et commencez à participer aux tournois dès maintenant.
            </p>
            <Link to="/auth?mode=register">
              <Button variant="hero" size="xl" className="group">
                Commencer maintenant
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
