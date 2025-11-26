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
} from "recharts";
import { DashboardFilters } from "@/components/Dashboard/FiltersPanel";
import { transformarDadosPesquisa } from "@/utils/transformarDadosPesquisa";
import dadosReais from "@/utils/dados_disciplinaPresencial.json";
import { DadoPesquisa } from "@/types/DadoPesquisa";

export default function Grafico({ filters }: { filters: DashboardFilters }) {
  const dados = dadosReais as DadoPesquisa[];

  // ✅ CROSS FILTER
  const dadosFiltrados = dados.filter((item) => {
    return (
      (filters.setorCurso === "Todos" ||
        item.setorCurso === filters.setorCurso) &&
      (filters.curso === "Todos" || item.curso === filters.curso) &&
      (filters.disciplina === "Todos" || item.disciplina === filters.disciplina)
    );
  });
  const dadosGrafico = transformarDadosPesquisa(dadosFiltrados);

  return (
    <Paper className="p-6 border rounded-xl">
      <Typography variant="h6" className="font-bold mb-4">
        Distribuição de respostas por pergunta
      </Typography>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={dadosGrafico}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pergunta" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Concordo" fill="#22c55e" />
          <Bar dataKey="Discordo" fill="#ef4444" />
          <Bar dataKey="Desconheço" fill="#facc15" />
          <Bar dataKey="Sim" fill="#3b82f6" />
          <Bar dataKey="Não" fill="#a855f7" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
