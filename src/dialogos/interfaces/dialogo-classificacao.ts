import { Resposta } from "../nos/respostas/resposta.entity";
import { No } from "../nos/no.entity";
import { MemoriaIdentidade, MemoriaInformativa } from "../../chat-io/classes/Memoria";
import { Classificacao } from "../classificador/classificacao.interface";
import { Opcao } from "../../dialogos/nos/respostas/opcao.entity";

export interface DialogoClassificacao{

  resposta: string;
  opcoes: {
    ds_opcao: string;
    vl_opcao: string;
  }[] | Opcao[];
  classificacao: Classificacao;
  lastNoExecutado: No;
  memoriasIdentidade: MemoriaIdentidade<any>[];
  memoriasInformativa: MemoriaInformativa[];
  iniciado: boolean;

}