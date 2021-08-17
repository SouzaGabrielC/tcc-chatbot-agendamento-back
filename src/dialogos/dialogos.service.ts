import { Injectable } from '@nestjs/common';
import { Dialogo } from './dialogo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntencoesService } from './intencoes/intencoes.service';
import { Intencao } from './intencoes/intecao.entity';
import { Entidade } from './entidades/entidade.entity';
import { EntidadesService } from './entidades/entidades.service';
import { NosService } from './nos/nos.service';
import { No } from './nos/no.entity';
import { ClassificadorService } from './classificador/classificador.service';
import { MemoriaIdentidade, MemoriaInformativa } from '../chat-io/classes/Memoria';
import { DialogoClassificacao } from './interfaces/dialogo-classificacao';

@Injectable()
export class DialogosService {

  private dialogosAtivos: Dialogo[] = [];

  constructor(
    @InjectRepository(Dialogo) private readonly repository: Repository<Dialogo>,
    private readonly intencoesService: IntencoesService,
    private readonly entidadesService: EntidadesService,
    private readonly nosService: NosService,
    private readonly classificadorService: ClassificadorService
  ) { }

  async carregarDialogoBot(dialogo: Dialogo) {

    const dialogoCarregado = await this.repository.findOne(dialogo, {
      loadRelationIds: true
    });

    const intencoes: Intencao[] = await this.intencoesService.carregarIntencoes(dialogoCarregado.intencoes);
    dialogoCarregado.intencoes = intencoes;

    
    const entidades: Entidade[] = await this.entidadesService.carregarEntidades(dialogoCarregado.entidades);
    dialogoCarregado.entidades = entidades;
    
    const nos: No[] = await this.nosService.carregarNosDialogo(dialogoCarregado);
    
    dialogoCarregado.nos = nos;
    
    dialogoCarregado.classificador = this.classificadorService.criarClassificador(intencoes);
    
    intencoes.forEach(intencao => {
      intencao.afterUpdateSubject.subscribe(() => {
        this.classificadorService.treinarClassificador(dialogoCarregado.classificador, dialogo.intencoes);
      });
    });
    
    dialogoCarregado.service = this;

    this.dialogosAtivos.push(dialogoCarregado);

    return dialogoCarregado;
  }

  async classificacao(frase: string, dialogo: Dialogo, iniciado: boolean, memoriasIdentidade: MemoriaIdentidade<any>[], memoriasInformativa: MemoriaInformativa[], lastNoExecutado?: No): Promise<DialogoClassificacao> {
    
    console.log("Memorias Informativas, Inicio Classificacao:", memoriasInformativa);
    console.log("Memorias Identidades, Inicio Classificacao:", memoriasIdentidade);

    let retorno: DialogoClassificacao = {
      resposta: null,
      opcoes: null,
      classificacao: null,
      lastNoExecutado: null,
      memoriasIdentidade: [],
      memoriasInformativa: [],
      iniciado
    };

    const classificacao = await this.classificadorService.classificar(frase, dialogo.classificador, dialogo.entidades, memoriasIdentidade);
    retorno.classificacao = classificacao;
    
    console.log("Classificacao do Classificador: ", classificacao);

    if (iniciado) {
      
      console.log("Dialogo ja foi iniciado");

      if (lastNoExecutado) {
        
        console.log("Ultimo no executado", lastNoExecutado.id, lastNoExecutado.nm_no, lastNoExecutado.ds_padrao);
        
        if (lastNoExecutado.nos_filhos.length > 0) {

          console.log("Ultimo no executado tem filhos");

          const retornoAvaliacao = await this.nosService.avaliarNos(lastNoExecutado.nos_filhos, classificacao, memoriasIdentidade);

          if(retornoAvaliacao){

            retorno.lastNoExecutado = retornoAvaliacao.lastNo ? retornoAvaliacao.lastNo : retornoAvaliacao.no;
            retorno.memoriasIdentidade = retornoAvaliacao.memoriasIdentidade;
            retorno.memoriasInformativa = this.nosService.juntarMemorias(memoriasInformativa, retornoAvaliacao.memoriasInformativa);
            
            const resposta = retornoAvaliacao.no ? this.nosService.getRespostaNo(retornoAvaliacao.no) : null;

            retorno.resposta = this.nosService.getRespostaTexto(resposta, classificacao, retorno.memoriasInformativa, retornoAvaliacao.retornoMetodo);
            
            if(resposta && resposta.ic_opcoes){
              retorno.opcoes = this.nosService.getRespostaOpcoes(resposta, classificacao, retorno.memoriasInformativa, retornoAvaliacao.retornoMetodo)
            }
              
            console.log("Retorno:", retorno);
            
            return retorno;
          }

        }

      }

      console.log("Ultimo no nao possui filhos");

      const retornoAvaliacao = await this.nosService.avaliarNos(dialogo.nos, classificacao, memoriasIdentidade);

      if(retornoAvaliacao){
        
        retorno.lastNoExecutado = retornoAvaliacao.lastNo ? retornoAvaliacao.lastNo : retornoAvaliacao.no;
        retorno.memoriasIdentidade = retornoAvaliacao.memoriasIdentidade;
        retorno.memoriasInformativa = this.nosService.juntarMemorias(memoriasInformativa, retornoAvaliacao.memoriasInformativa);

        const resposta = retornoAvaliacao.no ? this.nosService.getRespostaNo(retornoAvaliacao.no) : null;
        
        // const respostaTextoMetodo = retornoAvaliacao.retornoMetodo ? retornoAvaliacao.retornoMetodo.respostaTexto : null;
        
        retorno.resposta = this.nosService.getRespostaTexto(resposta, classificacao, retorno.memoriasInformativa, retornoAvaliacao.retornoMetodo);
        
        if(resposta && resposta.ic_opcoes){
          retorno.opcoes = this.nosService.getRespostaOpcoes(resposta, classificacao, retorno.memoriasInformativa, retornoAvaliacao.retornoMetodo)
        }
        
        console.log("Retorno:", retorno);
        return retorno;

      }
      
    } else {

      for (const no of dialogo.nos) {

        if (no.ds_padrao === "inicioDialogo") {

          const retornoNo = await this.nosService.chamarNo(no, classificacao, memoriasIdentidade);

          const resposta = retornoNo.no ? this.nosService.getRespostaNo(retornoNo.no) : null;
          
          retorno.memoriasIdentidade = retornoNo.memoriasIdentidade;
          retorno.memoriasInformativa = this.nosService.juntarMemorias(memoriasInformativa, retornoNo.memoriasInformativa);
          
          retorno.resposta = this.nosService.getRespostaTexto(resposta, null, retorno.memoriasInformativa, null);

          retorno.lastNoExecutado = retornoNo.lastNo ? retornoNo.lastNo : retornoNo.no;
          retorno.iniciado = true;
          return retorno;

        }

      }
      
      retorno.iniciado = true;

      return retorno;

    }


  }


}
