import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search, TableChart } from "@mui/icons-material";

interface DataRow {
  id: number;
  questionario: string;
  pergunta: string;
  curso: string;
  situacao: string;
  respostas: number;
}

const mockData: DataRow[] = [
  {
    id: 1,
    questionario: "Avaliação Docente",
    pergunta: "Como você avalia a didática do professor?",
    curso: "Engenharia de Software",
    situacao: "Respondida",
    respostas: 234,
  },
  {
    id: 2,
    questionario: "Avaliação de Infraestrutura",
    pergunta: "As instalações atendem suas necessidades?",
    curso: "Ciência da Computação",
    situacao: "Em Andamento",
    respostas: 156,
  },
  {
    id: 3,
    questionario: "Satisfação Geral",
    pergunta: "Você recomendaria este curso?",
    curso: "Administração",
    situacao: "Respondida",
    respostas: 189,
  },
  {
    id: 4,
    questionario: "Avaliação de Serviços",
    pergunta: "Como avalia o atendimento da secretaria?",
    curso: "Direito",
    situacao: "Pendente",
    respostas: 0,
  },
  {
    id: 5,
    questionario: "Avaliação Docente",
    pergunta: "O conteúdo programático é adequado?",
    curso: "Medicina",
    situacao: "Respondida",
    respostas: 298,
  },
  {
    id: 6,
    questionario: "Avaliação de Infraestrutura",
    pergunta: "A biblioteca possui acervo adequado?",
    curso: "Engenharia de Software",
    situacao: "Respondida",
    respostas: 187,
  },
  {
    id: 7,
    questionario: "Satisfação Geral",
    pergunta: "Como avalia o suporte ao aluno?",
    curso: "Ciência da Computação",
    situacao: "Em Andamento",
    respostas: 123,
  },
  {
    id: 8,
    questionario: "Avaliação de Serviços",
    pergunta: "Os laboratórios são bem equipados?",
    curso: "Administração",
    situacao: "Respondida",
    respostas: 201,
  },
];

export const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = mockData.filter(
    (row) =>
      row.questionario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.curso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case "Respondida":
        return "bg-accent-light text-accent";
      case "Em Andamento":
        return "bg-warning-light text-warning";
      case "Pendente":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Paper elevation={0} className="border border-border rounded-xl overflow-hidden">
      <Box className="p-6 border-b border-border">
        <Box className="flex items-center justify-between mb-4">
          <Box className="flex items-center gap-2">
            <TableChart className="text-primary" />
            <Typography variant="h6" className="font-bold text-foreground">
              Dados de Avaliação
            </Typography>
          </Box>
        </Box>
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar por questionário, pergunta ou curso..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-muted-foreground" />
              </InputAdornment>
            ),
          }}
          className="bg-background"
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead className="bg-muted">
            <TableRow>
              <TableCell className="font-bold text-foreground">ID</TableCell>
              <TableCell className="font-bold text-foreground">Questionário</TableCell>
              <TableCell className="font-bold text-foreground">Pergunta</TableCell>
              <TableCell className="font-bold text-foreground">Curso</TableCell>
              <TableCell className="font-bold text-foreground">Situação</TableCell>
              <TableCell className="font-bold text-foreground" align="right">
                Respostas
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="text-muted-foreground">#{row.id}</TableCell>
                  <TableCell className="font-medium text-foreground">
                    {row.questionario}
                  </TableCell>
                  <TableCell className="text-foreground max-w-md">
                    {row.pergunta}
                  </TableCell>
                  <TableCell className="text-foreground">{row.curso}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.situacao}
                      size="small"
                      className={getSituacaoColor(row.situacao)}
                    />
                  </TableCell>
                  <TableCell align="right" className="font-bold text-foreground">
                    {row.respostas}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
        }
        className="border-t border-border"
      />
    </Paper>
  );
};
