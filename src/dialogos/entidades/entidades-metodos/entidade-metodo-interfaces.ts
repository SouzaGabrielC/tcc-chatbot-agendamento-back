import { MemoriaIdentidade } from "../../../chat-io/classes/Memoria";

export interface MetodoParams{

  memorias: MemoriaIdentidade<any>[];

}

export interface MetodoReturn{

  valores: Array<MetodoValores>;

}

export interface MetodoValores{
  
  nm_valor: string,
  sinonimos: Array<{
    ds_valor_sinonimo: string
  }>,
  valorId: any
  
}