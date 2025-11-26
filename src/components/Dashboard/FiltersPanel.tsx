import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

import dadosReais from "@/utils/dados_disciplinaPresencial.json";
import { DadoPesquisa } from "@/types/DadoPesquisa";

// ================= INTERFACE =================
export interface DashboardFilters {
  setorCurso: string;
  curso: string;
  disciplina: string;
  questionario: string;
}

interface Props {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

// ================= COMPONENTE =================
export default function FiltersPanel({ filters, onFiltersChange }: Props) {
  const dados = dadosReais as DadoPesquisa[];

  const handleChange = (field: keyof DashboardFilters, value: string) => {
    const updated = { ...filters, [field]: value };

    if (field === "setorCurso") {
      updated.curso = "Todos";
      updated.disciplina = "Todos";
    }

    if (field === "curso") {
      updated.disciplina = "Todos";
    }

    onFiltersChange(updated);
  };

  // ✅ SETORES ÚNICOS
  const setores = [
    "Todos",
    ...Array.from(new Set(dados.map((d) => d.setorCurso))),
  ];

  // ✅ CURSOS BASEADOS NO SETOR
  const cursos =
    filters.setorCurso === "Todos"
      ? ["Todos"]
      : [
          "Todos",
          ...Array.from(
            new Set(
              dados
                .filter((d) => d.setorCurso === filters.setorCurso)
                .map((d) => d.curso)
            )
          ),
        ];

  // ✅ DISCIPLINAS BASEADAS EM SETOR + CURSO
  const disciplinas =
    filters.curso === "Todos"
      ? ["Todos"]
      : [
          "Todos",
          ...Array.from(
            new Set(
              dados
                .filter(
                  (d) =>
                    d.setorCurso === filters.setorCurso &&
                    d.curso === filters.curso
                )
                .map((d) => d.disciplina)
            )
          ),
        ];

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {/* SETOR */}
      <FormControl fullWidth size="small">
        <InputLabel>Setor</InputLabel>
        <Select
          value={filters.setorCurso}
          label="Setor"
          onChange={(e) => handleChange("setorCurso", e.target.value)}
        >
          {setores.map((setor) => (
            <MenuItem key={setor} value={setor}>
              {setor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* CURSO */}
      <FormControl
        fullWidth
        size="small"
        disabled={filters.setorCurso === "Todos"}
      >
        <InputLabel>Curso</InputLabel>
        <Select
          value={filters.curso}
          label="Curso"
          onChange={(e) => handleChange("curso", e.target.value)}
        >
          {cursos.map((curso) => (
            <MenuItem key={curso} value={curso}>
              {curso}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* DISCIPLINA */}
      <FormControl fullWidth size="small" disabled={filters.curso === "Todos"}>
        <InputLabel>Disciplina</InputLabel>
        <Select
          value={filters.disciplina}
          label="Disciplina"
          onChange={(e) => handleChange("disciplina", e.target.value)}
        >
          {disciplinas.map((disciplina) => (
            <MenuItem key={disciplina} value={disciplina}>
              {disciplina}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        onClick={() =>
          onFiltersChange({
            setorCurso: "Todos",
            curso: "Todos",
            disciplina: "Todos",
            questionario: "Todos",
          })
        }
      >
        Limpar filtros
      </Button>
    </Box>
  );
}
