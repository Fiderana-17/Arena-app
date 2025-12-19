import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  description?: string;
}

const StatCard = ({ title, value, icon: Icon, trend, description }: StatCardProps) => {
  return (
    <Card className="hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_hsl(187_100%_50%/0.1)]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="font-display text-3xl font-bold">{value}</p>
            {trend && (
              <p className={`text-sm ${trend.positive ? "text-emerald-400" : "text-destructive"}`}>
                {trend.positive ? "+" : "-"}{trend.value}%
                <span className="text-muted-foreground ml-1">vs mois dernier</span>
              </p>
            )}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
