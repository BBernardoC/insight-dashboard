import { Paper, Typography, Box } from "@mui/material";
import {
  Assessment,
  People,
  School,
  TrendingUp,
} from "@mui/icons-material";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: "primary" | "accent" | "warning" | "secondary";
}

const MetricCard = ({ title, value, icon, trend, color }: MetricCardProps) => {
  const colorClasses = {
    primary: "bg-primary-light text-primary",
    accent: "bg-accent-light text-accent",
    warning: "bg-warning-light text-warning",
    secondary: "bg-secondary text-secondary-foreground",
  };

  return (
    <Paper elevation={0} className="p-6 border border-border rounded-xl hover:shadow-lg transition-all">
      <Box className="flex items-start justify-between">
        <Box className="flex-1">
          <Typography variant="body2" className="text-muted-foreground mb-2 font-medium">
            {title}
          </Typography>
          <Typography variant="h4" className="font-bold text-foreground mb-2">
            {value}
          </Typography>
          {trend && (
            <Box className="flex items-center gap-1">
              <TrendingUp className="text-accent w-4 h-4" />
              <Typography variant="caption" className="text-accent font-medium">
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Box className={`p-3 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </Box>
      </Box>
    </Paper>
  );
};

export const MetricsCards = () => {
  const metrics = [
    {
      title: "Total de Pesquisas",
      value: "1,247",
      icon: <Assessment className="w-6 h-6" />,
      trend: "+12% vs mês anterior",
      color: "primary" as const,
    },
    {
      title: "Respostas Coletadas",
      value: "8,432",
      icon: <People className="w-6 h-6" />,
      trend: "+23% vs mês anterior",
      color: "accent" as const,
    },
    {
      title: "Cursos Avaliados",
      value: "42",
      icon: <School className="w-6 h-6" />,
      trend: "100% cobertura",
      color: "warning" as const,
    },
    {
      title: "Taxa de Resposta",
      value: "87%",
      icon: <TrendingUp className="w-6 h-6" />,
      trend: "+5% vs mês anterior",
      color: "secondary" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};
