import { No } from './no.entity';
import { MemoriaInformativa, MemoriaIdentidade } from '../../chat-io/classes/Memoria';
import { NoMetodoReturn } from './nos-metodos/no-metodo.interfaces';

export interface NoAvaliacaoReturn{

  no: No;
  lastNo?: No;
  memoriasIdentidade: MemoriaIdentidade<any>[];
  memoriasInformativa: MemoriaInformativa[];
  retornoMetodo: NoMetodoReturn;

}
