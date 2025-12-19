import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 text-center space-y-8 animate-fade-in">
        {/* Icon */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_40px_hsl(187_100%_50%/0.4)]">
          <Gamepad2 className="w-12 h-12 text-primary-foreground" />
        </div>

        {/* 404 */}
        <h1 className="font-display text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
          404
        </h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Page non trouvée</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Oups ! Il semble que cette page n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* CTA */}
        <Link to="/">
          <Button variant="hero" size="lg" className="gap-2">
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
