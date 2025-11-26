import { DadoPesquisa } from "@/types/DadoPesquisa";

export interface DadoGraficoPergunta {
  pergunta: string;
  // qualquer chave de resposta terá valor numérico
  [resposta: string]: string | number;
}

export function transformarDadosPesquisa(
  dados: DadoPesquisa[]
): DadoGraficoPergunta[] {
  const mapa = new Map<string, Map<number, string>>();

  // Garante 1 resposta por id_pesquisa por pergunta
  dados.forEach((item) => {
    if (!mapa.has(item.pergunta)) {
      mapa.set(item.pergunta, new Map());
    }
    mapa.get(item.pergunta)!.set(item.id_pesquisa, item.resposta);
  });

  const resultado: DadoGraficoPergunta[] = [];

  mapa.forEach((respostasPorPesquisa, pergunta) => {
    // declara explicitamente como DadoGraficoPergunta — resolve o erro de tipagem
    const contagem: DadoGraficoPergunta = { pergunta } as DadoGraficoPergunta;

    respostasPorPesquisa.forEach((resposta) => {
      // se já existir contador numérico para essa resposta, incrementa
      if (typeof contagem[resposta] === "number") {
        contagem[resposta] = (contagem[resposta] as number) + 1;
      } else {
        // inicializa com 1
        contagem[resposta] = 1;
      }
    });

    resultado.push(contagem);
  });

  return resultado;
}
