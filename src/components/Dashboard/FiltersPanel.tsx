import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";

import dadosReais from "@/utils/dados_disciplinaPresencial.json";
import { DadoPesquisa } from "@/types/DadoPesquisa";

// ================= INTERFACE =================
export interface DashboardFilters {
  setorCurso: string[];
  curso: string[];
  disciplina: string[];
  pergunta: string[];
  questionario: string;
}

interface Props {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

// ================= COMPONENTE =================
export default function FiltersPanel({ filters, onFiltersChange }: Props) {
  const dados = dadosReais as DadoPesquisa[];

  const handleChange = (field: keyof DashboardFilters, value: string[]) => {
    const updated = { ...filters, [field]: value };

    // Se alterar setor, limpa curso e disciplina
    if (field === "setorCurso") {
      updated.curso = [];
      updated.disciplina = [];
    }

    // Se alterar curso, limpa disciplina
    if (field === "curso") {
      updated.disciplina = [];
    }

    onFiltersChange(updated);
  };

  // ✅ SETORES ÚNICOS
  const setores = Array.from(new Set(dados.map((d) => d.setorCurso)));

  // ✅ CURSOS BASEADOS NO SETOR
  const cursos =
    filters.setorCurso.length === 0
      ? []
      : Array.from(
          new Set(
            dados
              .filter((d) => filters.setorCurso.includes(d.setorCurso))
              .map((d) => d.curso)
          )
        );

  // ✅ DISCIPLINAS BASEADAS EM SETOR + CURSO
  const disciplinas =
    filters.curso.length === 0 || filters.curso.length > 1
      ? []
      : Array.from(
          new Set(
            dados
              .filter(
                (d) =>
                  filters.setorCurso.includes(d.setorCurso) &&
                  filters.curso.includes(d.curso)
              )
              .map((d) => d.disciplina)
          )
        );

  // ✅ PERGUNTAS BASEADAS NOS FILTROS ANTERIORES
  const perguntas = Array.from(
    new Set(
      dados
        .filter((d) => {
          const setorMatch =
            filters.setorCurso.length === 0 ||
            filters.setorCurso.includes(d.setorCurso);
          const cursoMatch =
            filters.curso.length === 0 || filters.curso.includes(d.curso);
          const disciplinaMatch =
            filters.disciplina.length === 0 ||
            filters.disciplina.includes(d.disciplina);

          return setorMatch && cursoMatch && disciplinaMatch;
        })
        .map((d) => d.pergunta)
    )
  );

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {/* SETOR */}
      <FormControl fullWidth size="small">
        <InputLabel>Setor</InputLabel>
        <Select<String[]>
          multiple
          value={filters.setorCurso}
          label="Setor"
          onChange={(e: SelectChangeEvent<string[]>) =>
            handleChange("setorCurso", e.target.value as string[])
          }
          input={<OutlinedInput label="Setor" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {setores.map((setor) => (
            <MenuItem key={setor} value={setor}>
              {setor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* CURSO */}
      <FormControl fullWidth size="small" disabled={cursos.length === 0}>
        <InputLabel>Curso</InputLabel>
        <Select<String[]>
          multiple
          value={filters.curso}
          label="Curso"
          onChange={(e: SelectChangeEvent<string[]>) =>
            handleChange("curso", e.target.value as string[])
          }
          input={<OutlinedInput label="Curso" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {cursos.map((curso) => (
            <MenuItem key={curso} value={curso}>
              {curso}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* DISCIPLINA */}
      <FormControl fullWidth size="small" disabled={disciplinas.length === 0}>
        <InputLabel>Disciplina</InputLabel>
        <Select<String[]>
          multiple
          value={filters.disciplina}
          label="Disciplina"
          onChange={(e: SelectChangeEvent<string[]>) =>
            handleChange("disciplina", e.target.value as string[])
          }
          input={<OutlinedInput label="Disciplina" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {disciplinas.map((disciplina) => (
            <MenuItem key={disciplina} value={disciplina}>
              {disciplina}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* PERGUNTA */}
      <FormControl fullWidth size="small">
        <InputLabel>Perguntas</InputLabel>
        <Select<String[]>
          multiple
          value={filters.pergunta}
          label="Perguntas"
          onChange={(e: SelectChangeEvent<string[]>) =>
            handleChange("pergunta", e.target.value as string[])
          }
          input={<OutlinedInput label="Perguntas" />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: 0.5,
                flexWrap: "wrap", // <<< PERMITE QUEBRAR LINHA
              }}
            >
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={`Q${perguntas.indexOf(value) + 1}`}
                  title={value}
                  size="small"
                  sx={{
                    maxWidth: "100%",
                    "& .MuiChip-label": {
                      whiteSpace: "normal", // <<< permite quebra de texto
                      wordBreak: "break-word",
                    },
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                maxWidth: 900, // limita largura
                width: "100%",
                maxHeight: 320,
              },
            },
          }}
        >
          {perguntas.map((pergunta, index) => (
            <MenuItem
              key={pergunta}
              value={pergunta}
              sx={{
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {`Q${index + 1} - ${pergunta}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        onClick={() =>
          onFiltersChange({
            setorCurso: [],
            curso: [],
            disciplina: [],
            pergunta: [],
            questionario: "Todos",
          })
        }
      >
        Limpar filtros
      </Button>
    </Box>
  );
}
