import { Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export const ChartsSection = () => {
  const courseData = [
    { name: "Eng. Software", respostas: 1245, avaliacoes: 45 },
    { name: "Ciência Comp.", respostas: 1089, avaliacoes: 38 },
    { name: "Administração", respostas: 987, avaliacoes: 42 },
    { name: "Direito", respostas: 856, avaliacoes: 35 },
    { name: "Medicina", respostas: 1432, avaliacoes: 52 },
  ];

  const statusData = [
    { name: "Respondidas", value: 6842 },
    { name: "Pendentes", value: 1245 },
    { name: "Em Andamento", value: 345 },
  ];

  const trendData = [
    { mes: "Jan", respostas: 1200 },
    { mes: "Fev", respostas: 1450 },
    { mes: "Mar", respostas: 1680 },
    { mes: "Abr", respostas: 1890 },
    { mes: "Mai", respostas: 2100 },
    { mes: "Jun", respostas: 2340 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Paper elevation={0} className="p-6 border border-border rounded-xl">
          <Typography variant="h6" className="font-bold text-foreground mb-4">
            Respostas por Curso
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Bar dataKey="respostas" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="avaliacoes" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </div>

      <div>
        <Paper elevation={0} className="p-6 border border-border rounded-xl">
          <Typography variant="h6" className="font-bold text-foreground mb-4">
            Situação das Respostas
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </div>

      <div className="lg:col-span-3">
        <Paper elevation={0} className="p-6 border border-border rounded-xl">
          <Typography variant="h6" className="font-bold text-foreground mb-4">
            Evolução de Respostas (6 meses)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="respostas"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </div>
    </div>
  );
};
