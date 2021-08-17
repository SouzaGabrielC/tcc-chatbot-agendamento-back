import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { No } from './no.entity';
import { Repository, TreeRepository } from 'typeorm';
import { Dialogo } from '../dialogo.entity';
import { Resposta } from './respostas/resposta.entity';
import { Memoria } from './memoria.entity';
import { Tipo } from './enums/Tipo';
import { MemoriaInformativa, MemoriaIdentidade, Memoria as MemoriaInterface } from '../../chat-io/classes/Memoria';
import { Classificacao } from '../classificador/classificacao.interface';
import { Operadores } from './enums/Operadores';
import { NosMetodosService } from './nos-metodos/nos-metodos.service';
import { NoAvaliacaoReturn } from './no.interfaces';
import { NoMetodoReturn } from './nos-metodos/no-metodo.interfaces';

@Injectable()
export class NosService {

  nos: No[] = [];

  constructor(
    @InjectRepository(No) private readonly repository: TreeRepository<No>,
    @InjectRepository(Resposta) private readonly respostaRepository: Repository<Resposta>,
    @InjectRepository(Memoria) private readonly memoriaRepository: Repository<Memoria>,
    private readonly nosMetodosService: NosMetodosService
  ) { }

  async carregarNosDialogo(dialogo: Dialogo) {

    const nosDialogo = await this.repository.find({
      where: {
        id_dialogo: dialogo.id
      },
      order: {
        vl_ordem: 'ASC'
      },
      relations: ['respostas', 'memorias']
    });


    // Achar nos de pulo

    for(let i = 0; i < nosDialogo.length; i++){

      if((nosDialogo[i].ic_jump || nosDialogo[i].ic_jump_evaluate) && nosDialogo[i].id_jump_no){

        for(let j = 0; j < nosDialogo.length; j++){

          if(nosDialogo[j].id === nosDialogo[i].id_jump_no){

            nosDialogo[i].jump_no = nosDialogo[j];
            break;

          }

        }

      }

    }

    // montar estrutura nos filhos e pais
    const nosIniciais = [];

    for(let i = 0; i < nosDialogo.length; i++){ 

      if(nosDialogo[i].id_no_pai){

        for(let j = 0; j < nosDialogo.length; j++){

          if(nosDialogo[j].id === nosDialogo[i].id_no_pai){

            if(!nosDialogo[j].nos_filhos)
              nosDialogo[j].nos_filhos = [];

            nosDialogo[j].nos_filhos.push(nosDialogo[i]);

          }

        }

      } else {

        nosIniciais.push(nosDialogo[i]);

      }

      if(!nosDialogo[i].nos_filhos)
        nosDialogo[i].nos_filhos = [];

    }

    this.nos.push(...nosIniciais);

    return nosIniciais;

  }

  getRespostaNo(no: No): Resposta {

    if (no.ic_reposta_aleatoria) {

      const respostaIndex = Math.floor(Math.random() * no.respostas.length);
      return no.respostas[respostaIndex];

    } else {

      if (no.index_ultima_resposta === null) {

        no.index_ultima_resposta = 0;
        return no.respostas[0];

      } else {

        const respostaIndex = no.index_ultima_resposta + 1 < no.respostas.length ? no.index_ultima_resposta + 1 : 0;
        no.index_ultima_resposta = respostaIndex;

        return no.respostas[respostaIndex];

      }

    }


  }

  getRespostaOpcoes(resposta: Resposta, classificacao: Classificacao, memoriasInformativa: MemoriaInformativa[], retornoMetodo: NoMetodoReturn){

    if(resposta){
      
      return retornoMetodo && retornoMetodo.opcoes ? retornoMetodo.opcoes : resposta.opcoes;
      
    }

  }

  getRespostaTexto(resposta: Resposta, classificacao: Classificacao, memoriasInformativa: MemoriaInformativa[], retornoMetodo: NoMetodoReturn): string {
    let respostaTexto = "";

    if(resposta){
      
      const regex = new RegExp(/(\{\{((?:[@,&]\w*)|(?:metodo))\}\})/, "g");
  
      let matched;
  
      let ultimoIndice = 0;
  
      while (matched = regex.exec(resposta.ds_reposta)) {
  
        respostaTexto += resposta.ds_reposta.slice(ultimoIndice, matched.index);
        ultimoIndice = matched.index + matched[0].length;
  
        if (matched[2] === 'metodo') {
          respostaTexto += retornoMetodo && retornoMetodo.respostaTexto ? retornoMetodo.respostaTexto : "";
        } else if (matched[2][0] === Tipo.ENTIDADE) {
  
          if (classificacao) {
            for (const entidade of classificacao.entidades) {
  
              if (entidade.entidade === matched[2]) {
                respostaTexto += entidade.valor;
                break;
              }
  
            }
          }
  
        } else if (matched[2][0] === Tipo.MEMORIA_INFORMATIVA) {
  
          for (const memoria of memoriasInformativa) {
  
            if (memoria.nome === matched[2]) {
              respostaTexto += memoria.valor;
              break;
            }
  
          }
  
        }
  
      }
  
      respostaTexto += resposta.ds_reposta.slice(ultimoIndice, resposta.ds_reposta.length);
      
    } else {

      const respostaTextoMetodo = retornoMetodo ? retornoMetodo.respostaTexto : "";

      respostaTexto = respostaTextoMetodo;

    }

    return respostaTexto;

  }

  async avaliarNos(nos: No[], classificacao: Classificacao, memoriasIdentidade: MemoriaIdentidade<any>[]): Promise<NoAvaliacaoReturn> {

    console.log("--- Avaliando nos");

    for (const no of nos) {

      if (no.ds_padrao === "seNao") {

        console.log(`No ${no.nm_no || no.ds_padrao}, entrou? true`);

        const retornoNo = await this.chamarNo(no, classificacao, memoriasIdentidade);

        if (retornoNo) {
          return retornoNo;
        }

      }
      else if(no.ds_padrao === "qualquerTexto" && classificacao.frase.trim().length > 0){

        console.log(`No ${no.nm_no || no.ds_padrao}, entrou? true`);

        const retornoNo = await this.chamarNo(no, classificacao, memoriasIdentidade);

        if (retornoNo) {
          return retornoNo;
        }

      }
      else {

        const entrarNo = this.verificarEntrarNo(no, classificacao, memoriasIdentidade);

        console.log(`No ${no.nm_no || no.ds_padrao}, entrou? ${entrarNo}`);

        if (entrarNo) {

          const retornoNo = await this.chamarNo(no, classificacao, memoriasIdentidade);

          if (retornoNo) {
            return retornoNo;
          }

        }


      }

    }

    return null;

  }

  public juntarMemorias(memoriasAntigas: MemoriaInterface[], memoriasNovas: MemoriaInterface[]): MemoriaInterface[]{

    for(const memoriaNova of memoriasNovas){

      let achouMemoriaAntiga = false;

      for(const index in memoriasAntigas){

        if(memoriasAntigas[index].nome === memoriaNova.nome){
          achouMemoriaAntiga = true;
          if(memoriaNova.valor === null || memoriaNova.valor === 'null'){
            memoriasAntigas.splice(parseInt(index), 1);
          }else{
            memoriasAntigas[index].valor = memoriaNova.valor;
          }

        }

      }

      if(!achouMemoriaAntiga && memoriaNova.valor){
        memoriasAntigas.push(memoriaNova);
      }

    }

    return memoriasAntigas;

  }

  async chamarNo(no: No, classificacao: Classificacao, memoriasIdentidade: MemoriaIdentidade<any>[]): Promise<NoAvaliacaoReturn> {

    console.log("--- Chamando no", no.id, no.nm_no, no.ds_padrao, no.ic_jump, no.jump_no);

    const memoriasIdentidadeFilter = no.memorias.filter(memoria => memoria.ic_identidade);
    const memoriasInformativaFilter = no.memorias.filter(memoria => !memoria.ic_identidade);

    let metodoReturn: NoMetodoReturn = null;

    if (no.ic_metodo) {

      try {
        
        metodoReturn = await this.nosMetodosService.chamarMetodo(no.nm_metodo, {
          criarRespostaTexto: no.ic_metodo_criar_texto,
          classificacao,
          memoriasIdentidade: memoriasIdentidade
        });
  
        if (!metodoReturn.executadoComSucesso){
          
          if (metodoReturn.error) console.error(metodoReturn.error);
  
        }

      } catch (error) {

        console.error(error);

        metodoReturn = { 
          respostaTexto: "Tivemos algum problema interno, tente novamente mais tarde.",
          executadoComSucesso : false
        }

      }
        
    }


    const memoriasIdentidadeNo = memoriasIdentidadeFilter.map(memoria => {
      let valor: any = this.tratarValorMemoria(
        memoria.nm_memoria,
        memoria.ds_valor, 
        true, 
        classificacao, 
        memoriasIdentidade,
        metodoReturn ? metodoReturn.memoriasValor : null);
        console.log("Filter:", memoria.nm_memoria, valor);
      return new MemoriaIdentidade(memoria.nm_memoria, valor);
    });

    const memoriasInformativaNo = memoriasInformativaFilter.map(memoria => {
      let valor: string = this.tratarValorMemoria(
        memoria.nm_memoria,
        memoria.ds_valor, 
        false, 
        classificacao, 
        memoriasIdentidade,
        metodoReturn ? metodoReturn.memoriasTexto : null);

      return new MemoriaInformativa(memoria.nm_memoria, valor);
    });

    console.log("Chamou e retornou:", memoriasIdentidadeNo);

    const memoriasIdentidadeJoin = this.juntarMemorias(memoriasIdentidade, memoriasIdentidadeNo);

    if(no.ic_metodo && metodoReturn && !metodoReturn.executadoComSucesso){
      return {
        no: null,
        memoriasIdentidade: memoriasIdentidadeJoin,
        memoriasInformativa: memoriasInformativaNo,
        retornoMetodo: metodoReturn
      };
    }

    if(no.ic_wait_input && no.ic_jump){
      return {
        no: no,
        lastNo: no.jump_no,
        memoriasIdentidade: memoriasIdentidadeJoin,
        memoriasInformativa: memoriasInformativaNo,
        retornoMetodo: metodoReturn
      };
    }
    else if (no.ic_wait_input) {
      return {
        no: no,
        memoriasIdentidade: memoriasIdentidadeJoin,
        memoriasInformativa: memoriasInformativaNo,
        retornoMetodo: metodoReturn
      };

    }
    else if (no.ic_jump) {

      const jump_no = await this.chamarNo(no.jump_no, classificacao, memoriasIdentidadeJoin);

      memoriasInformativaNo.push(...jump_no.memoriasInformativa);

      return {
        no: jump_no.no,
        memoriasIdentidade: jump_no.memoriasIdentidade,
        memoriasInformativa: memoriasInformativaNo,
        retornoMetodo: jump_no.retornoMetodo
      };

    }
    else if (no.ic_jump_evaluate) {

      const entrarJumpNo = this.verificarEntrarNo(no.jump_no, classificacao, memoriasIdentidade);

      if (entrarJumpNo) {

        const jump_no = await this.chamarNo(no.jump_no, classificacao, memoriasIdentidadeJoin);

        memoriasInformativaNo.push(...jump_no.memoriasInformativa);

        return {
          no: jump_no.no,
          memoriasIdentidade: jump_no.memoriasIdentidade,
          memoriasInformativa: memoriasInformativaNo,
          retornoMetodo: jump_no.retornoMetodo
        };

      }

      return {
        no,
        memoriasIdentidade: memoriasIdentidadeJoin,
        memoriasInformativa: memoriasInformativaNo,
        retornoMetodo: metodoReturn
      }

    }
    else if (no.ic_evaluate_children) {

      if (no.nos_filhos.length > 0) {

        const noAvaliado = await this.avaliarNos(no.nos_filhos, classificacao, memoriasIdentidadeJoin);

        if(noAvaliado){

          memoriasInformativaNo.push(...noAvaliado.memoriasInformativa);
  
          return {
            no: noAvaliado.no,
            lastNo: noAvaliado.lastNo,
            memoriasIdentidade: noAvaliado.memoriasIdentidade,
            memoriasInformativa: memoriasInformativaNo,
            retornoMetodo: noAvaliado.retornoMetodo
          }

        }

        return {
          no,
          memoriasIdentidade: memoriasIdentidadeJoin,
          memoriasInformativa: memoriasInformativaNo,
          retornoMetodo: metodoReturn
        }


      }

      return {
        no,
        memoriasIdentidade: memoriasIdentidadeJoin,
        memoriasInformativa: memoriasInformativaNo,
        retornoMetodo: metodoReturn
      }

    }

  }

  tratarValorMemoria(nome: string, valor: string, isIdentidade: boolean, classificacao: Classificacao, memoriasIdentidade: MemoriaIdentidade<any>[], retornoMemoriaMetodo: any) {

    const expressao = new RegExp('[@,$][\\w,.]*', 'gim');

    let matches, values = [];

    if(valor.trim() === 'metodo') {

      if(retornoMemoriaMetodo) {

        if(typeof retornoMemoriaMetodo === 'object'){

          let found = false;

          for(let attrName in retornoMemoriaMetodo){

            if(attrName === nome){
              found = true;
              valor = JSON.stringify(retornoMemoriaMetodo[attrName]);
            }

          }

          if(!found){
            valor = null;
          }

        } else {

          valor = retornoMemoriaMetodo;

        }

      } else {
        valor = null;
      }

    } else if(valor.trim() === 'texto') {
      valor = JSON.stringify(classificacao.frase);
    }


    while (matches = expressao.exec(valor)) {
      values.push(matches);
    }

    for (const value of values) {

      if (value[0][0] === Tipo.ENTIDADE) {

        classificacao.entidades.forEach(entidade => {

          if (entidade.entidade === value[0]) {
            if (isIdentidade)
              valor = valor.replace(value[0], JSON.stringify(entidade.valorId));
            else
              valor = valor.replace(value[0], entidade.valor);
          }
        });
      } else {

        memoriasIdentidade.forEach(memoria => {

          if (memoria.nome === value[0]) {
            if (isIdentidade)
              valor = valor.replace(value[0], JSON.stringify(memoria.valor));
          }

        });

      }

    }

    if (isIdentidade)
      return JSON.parse(valor);
    else
      return valor;

  }

  verificarEntrarNo(no: No, classificacao: Classificacao, memoriasIdentidade: MemoriaIdentidade<any>[]): boolean {

    if (no.padraoSeparado.length > 1) {

      const testArray = [];

      for (const value of no.padraoSeparado) {

        let matched = false;


        if (value === Operadores.AND) {
          matched = true;
          testArray.push('&&');
        }
        else if (value === Operadores.OR) {
          matched = true;
          testArray.push('||');
        }
        else if (value[0] === Tipo.INTENCAO) {
          if (value === classificacao.intencao) {
            matched = true;
            testArray.push(matched);
          }
        }
        else if (value[0] === Tipo.ENTIDADE) {
          for (const entidade of classificacao.entidades) {
            if (entidade.entidade === value) {
              matched = true;
              testArray.push(matched);
              break;
            } else {
              const entidadeSplit = value.split('.');
              if(entidadeSplit.length > 1){
                if(entidade.entidade === entidadeSplit[0] && (entidadeSplit[1] === entidade.valor || entidadeSplit[1] === entidade.valorId)){
                  matched = true;
                  testArray.push(matched);
                  break;
                }
              }
            }
          }
        }
        else if (value[0] === Tipo.MEMORIA_IDENTIDADE) {
          for (const contexto of memoriasIdentidade) {
            if (contexto.nome === value) {
              matched = true;
              testArray.push(matched);
              break;
            }
          }
        }

        if (!matched)
          testArray.push(matched);
      }

      return eval(testArray.join(' '));

    } else {

      let matched = false;

      if (no.padraoSeparado[0][0] === Tipo.INTENCAO) {
        if (no.padraoSeparado[0] === classificacao.intencao) {
          matched = true;
        }
      }
      else if (no.padraoSeparado[0][0] === Tipo.ENTIDADE) {
        for (const entidade of classificacao.entidades) {
          if (entidade.entidade === no.padraoSeparado[0]) {
            matched = true;
            break;
          } else {
            const entidadeSplit = no.padraoSeparado[0].split('.');
            if(entidadeSplit.length > 1){
              if(entidade.entidade === entidadeSplit[0] && (entidadeSplit[1] === entidade.valor || entidadeSplit[1] === entidade.valorId)){
                matched = true;
                break;
              }
            }
          }
        }
      }

      else if (no.padraoSeparado[0][0] === Tipo.MEMORIA_IDENTIDADE) {
        for (const contexto of memoriasIdentidade) {
          if (contexto.nome === no.padraoSeparado[0]) {
            matched = true;
            break;
          }
        }
      }


      return matched;


    }

  }

}
