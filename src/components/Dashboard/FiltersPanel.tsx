import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
} from "@mui/material";
import { FilterList, Clear } from "@mui/icons-material";

export interface DashboardFilters {
  curso: string;
  setorCurso: string;
  situacao: string;
  questionario: string;
}

interface FiltersPanelProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

export const FiltersPanel = ({ filters, onFiltersChange }: FiltersPanelProps) => {
  const [localFilters, setLocalFilters] = useState<DashboardFilters>(filters);

  const cursos = [
    "Todos",
    "Engenharia de Software",
    "Ciência da Computação",
    "Administração",
    "Direito",
    "Medicina",
  ];

  const setores = [
    "Todos",
    "Exatas",
    "Humanas",
    "Biológicas",
    "Tecnologia",
  ];

  const situacoes = [
    "Todos",
    "Respondida",
    "Pendente",
    "Em Andamento",
  ];

  const questionarios = [
    "Todos",
    "Avaliação Docente",
    "Avaliação de Infraestrutura",
    "Avaliação de Serviços",
    "Satisfação Geral",
  ];

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      curso: "Todos",
      setorCurso: "Todos",
      situacao: "Todos",
      questionario: "Todos",
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(v => v !== "Todos");

  return (
    <Paper elevation={0} className="p-6 border border-border rounded-xl">
      <Box className="flex items-center justify-between mb-4">
        <Box className="flex items-center gap-2">
          <FilterList className="text-primary" />
          <Typography variant="h6" className="font-bold text-foreground">
            Filtros
          </Typography>
        </Box>
        {hasActiveFilters && (
          <Button
            startIcon={<Clear />}
            onClick={handleClearFilters}
            size="small"
            className="text-muted-foreground hover:text-foreground"
          >
            Limpar
          </Button>
        )}
      </Box>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <FormControl fullWidth size="small">
          <InputLabel>Curso</InputLabel>
          <Select
            value={localFilters.curso}
            label="Curso"
            onChange={(e) => handleFilterChange("curso", e.target.value)}
            className="bg-background"
          >
            {cursos.map((curso) => (
              <MenuItem key={curso} value={curso}>
                {curso}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Setor do Curso</InputLabel>
          <Select
            value={localFilters.setorCurso}
            label="Setor do Curso"
            onChange={(e) => handleFilterChange("setorCurso", e.target.value)}
            className="bg-background"
          >
            {setores.map((setor) => (
              <MenuItem key={setor} value={setor}>
                {setor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Situação</InputLabel>
          <Select
            value={localFilters.situacao}
            label="Situação"
            onChange={(e) => handleFilterChange("situacao", e.target.value)}
            className="bg-background"
          >
            {situacoes.map((situacao) => (
              <MenuItem key={situacao} value={situacao}>
                {situacao}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Questionário</InputLabel>
          <Select
            value={localFilters.questionario}
            label="Questionário"
            onChange={(e) => handleFilterChange("questionario", e.target.value)}
            className="bg-background"
          >
            {questionarios.map((questionario) => (
              <MenuItem key={questionario} value={questionario}>
                {questionario}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {hasActiveFilters && (
        <Box className="flex gap-2 mt-4 flex-wrap">
          <Typography variant="caption" className="text-muted-foreground mr-2 self-center">
            Filtros ativos:
          </Typography>
          {Object.entries(localFilters).map(([key, value]) => {
            if (value !== "Todos") {
              return (
                <Chip
                  key={key}
                  label={`${key}: ${value}`}
                  onDelete={() => handleFilterChange(key as keyof DashboardFilters, "Todos")}
                  size="small"
                  className="bg-primary-light text-primary"
                />
              );
            }
            return null;
          })}
        </Box>
      )}
    </Paper>
  );
};
