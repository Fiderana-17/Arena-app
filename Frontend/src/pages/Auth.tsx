import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Gamepad2, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import authBackground from "@/assets/auth-background.jpg";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const isRegister = searchParams.get("mode") === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (isRegister && formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: isRegister ? "Compte créé !" : "Connexion réussie !",
      description: isRegister
        ? "Bienvenue sur Arena Gaming !"
        : "Content de vous revoir !",
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authBackground})` }}
      />
      
      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95" />
      
      {/* Animated Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: "2s" }} />
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Back Link */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors z-20 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Retour</span>
      </Link>

      {/* Main Card */}
      <Card className="w-full max-w-md relative z-10 bg-card/60 backdrop-blur-2xl border-primary/20 shadow-[0_0_60px_hsl(var(--primary)/0.15)] animate-slide-up">
        {/* Glow border effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 rounded-xl opacity-50 blur-sm -z-10" />
        
        <CardHeader className="text-center space-y-4 pb-2">
          {/* Logo with enhanced glow */}
          <Link to="/" className="flex items-center justify-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.5)] group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </Link>
          
          {/* Title with gaming style */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <CardTitle className="text-2xl font-display bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
                {isRegister ? "Rejoindre l'Arena" : "Entrer dans l'Arena"}
              </CardTitle>
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
            <CardDescription className="text-muted-foreground/80">
              {isRegister
                ? "Créez votre compte et commencez à dominer"
                : "Connectez-vous pour rejoindre la compétition"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-foreground/90">Pseudo de joueur</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="username"
                    placeholder="xXProGamerXx"
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground/90">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="gamer@arena.gg"
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground/90">Mot de passe</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/90">Confirmer le mot de passe</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <Button type="submit" variant="hero" className="w-full mt-6 h-12 text-base font-semibold" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Chargement...</span>
                </div>
              ) : isRegister ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Créer mon compte
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  Se connecter
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/60 px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          {/* Toggle link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isRegister ? "Déjà un compte ?" : "Nouveau sur Arena ?"}
            </span>{" "}
            <Link
              to={isRegister ? "/auth" : "/auth?mode=register"}
              className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline underline-offset-4"
            >
              {isRegister ? "Se connecter" : "Créer un compte"}
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};

export default Auth;
