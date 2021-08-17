import { MemoriaIdentidade } from "../../../chat-io/classes/Memoria";
import { Classificacao } from "../../classificador/classificacao.interface";

export interface NoMetodoParams{
  classificacao: Classificacao;
  memoriasIdentidade: MemoriaIdentidade<any>[];
  criarRespostaTexto?: boolean;
}

export interface NoMetodoReturn{
  respostaTexto?: string;
  memoriasTexto?: string | string[];
  memoriasValor?: any;
  opcoes?: {
    ds_opcao: string;
    vl_opcao: any;
  }[];
  executadoComSucesso: boolean;
  error?: any;
}
