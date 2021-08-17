import { Injectable, Inject, forwardRef, OnModuleInit } from '@nestjs/common';
import { NoMetodoParams, NoMetodoReturn } from './no-metodo.interfaces';
import { ClinicasService } from '../../../clinicas/clinicas.service';
import { ModuleRef } from '@nestjs/core';
import { ExamesService } from '../../../exames/exames.service';
import { Exame } from '../../../exames/exame.entity';
import { ExamesUnidadeService } from '../../../unidades/exames-unidade/exames-unidade.service';
import { UnidadesService } from '../../../unidades/unidades.service';
import { AgendasService, ConsultaProxima } from '../../../agendas/agendas.service';
import { PacientesService } from '../../../pacientes/pacientes.service';

@Injectable()
export class NosMetodosService implements OnModuleInit {

  private clinicasService: ClinicasService;
  private examesService: ExamesService;
  private examesUnidadeService: ExamesUnidadeService;
  private unidadesService: UnidadesService;
  private agendasService: AgendasService;
  private pacientesService: PacientesService;

  constructor(
    private readonly moduleRef: ModuleRef
  ) { }

  onModuleInit() {
    this.clinicasService = this.moduleRef.get(ClinicasService, { strict: false });
    this.examesService = this.moduleRef.get(ExamesService, { strict: false });
    this.examesUnidadeService = this.moduleRef.get(ExamesUnidadeService, { strict: false });
    this.unidadesService = this.moduleRef.get(UnidadesService, { strict: false });
    this.agendasService = this.moduleRef.get(AgendasService, { strict: false });
    this.pacientesService = this.moduleRef.get(PacientesService, { strict: false });
  }

  async chamarMetodo(nome: string, params: NoMetodoParams): Promise<NoMetodoReturn> {

    if (this[nome] && typeof this[nome] === 'function')
      return <Promise<NoMetodoReturn>>this[nome](params);
    else
      return {
        executadoComSucesso: false,
        error: `Metodo(${nome}) não encontrado no serviço.`
      }

  }

  async buscaEnderecoClinica(params: NoMetodoParams): Promise<NoMetodoReturn> {

    try {

      const clinicaMemoria = params.memoriasIdentidade.find(
        memoria => memoria.nome === "$clinica"
      );
      let respostaTexto = ``;
      
      if(clinicaMemoria){

        const clinica = await this.clinicasService.buscarClinicaComTodasUnidades(
          clinicaMemoria.valor
        );

        if(clinica && clinica.unidades && clinica.unidades.length > 0){
          
          clinica.unidades.forEach(unidade => respostaTexto += `\n- Unidade ${unidade.nm_unidade}: ${unidade.nm_rua}, ${unidade.cd_numero}`)
        
        } else {

          respostaTexto = `Não consegui encontrar nenhuma unidade da clinica no momento.`;

        }

        return {
          executadoComSucesso: true,
          respostaTexto
        }

      } else {

        respostaTexto = `Infelizmente tive um problema ao procurar os dados da clinica, poderia tentar mais tarde.`;

        return {
          executadoComSucesso: true,
          respostaTexto
        }

      }

      
    } catch (error) {

      return {
        error,
        executadoComSucesso: false
      }

    }


  }

  // TODO verificar a retirada desse metodo v
  async realizaExamePeloConvenio(params: NoMetodoParams): Promise<NoMetodoReturn> {

    return {
      executadoComSucesso: true,
      respostaTexto: "Realizamos sim o exame por este convenio"
    }

  }

  async retornaExameDaCategoria(params: NoMetodoParams): Promise<NoMetodoReturn> {

    try {

      const examesEntidade = params.classificacao.entidades.filter(entidade => entidade.entidade === "@exames");
      const categoriaEntidade = params.classificacao.entidades.filter(entidade => entidade.entidade === "@categoria_exames");

      const exameMemoria = params.memoriasIdentidade.find(memoria => memoria.nome === '$exame');
      const categoriaMemoria = params.memoriasIdentidade.find(memoria => memoria.nome === '$categoria');

      const idExame = exameMemoria ? parseInt(exameMemoria.valor) : null;
      let idCategoria = categoriaMemoria ? parseInt(categoriaMemoria.valor) : null;

      if((examesEntidade.length > 0 || idExame) && (categoriaEntidade.length > 0 || idCategoria)){
        
        const examesDaCategoria: Exame[] = [];

        if(examesEntidade.length > 0){

          for (const exameEntidade of examesEntidade) {

            const exame = await this.examesService.buscarExame(exameEntidade.valorId);

            if(exame && exame.categoria){

              idCategoria = idCategoria ? idCategoria : categoriaEntidade[0].valorId;

              if (exame.categoria.id_categoria === idCategoria)
                examesDaCategoria.push(exame);

            }

          }

        } else {

          const exame = await this.examesService.buscarExame(idExame);

          if(exame && exame.categoria){

            idCategoria = idCategoria ? idCategoria : categoriaEntidade[0].valorId;

            if (exame.categoria.id_categoria === idCategoria)
              examesDaCategoria.push(exame);

          }

        }

        if (examesDaCategoria.length > 0)
          return {
            executadoComSucesso: true,
            respostaTexto: "",
            memoriasTexto: examesDaCategoria[0].nm_exame,
            memoriasValor: examesDaCategoria[0].id_exame
          }
        else
          return {
            executadoComSucesso: false,
            error: "Não foi possivel achar categoria/exame"
          }
        
      }

      
    } catch (error) {

      return {
        error,
        executadoComSucesso: false
      }

    }
    
  }

  async buscaUnidadesExame(params: NoMetodoParams): Promise<NoMetodoReturn> {

    try {

      const exameCategoria = await this.retornaExameDaCategoria(params);
      
      if(exameCategoria.executadoComSucesso){

        const examesUnidade = await this.examesUnidadeService.buscarTodosExamesUnidadesDoExame(exameCategoria.memoriasValor);

        if (examesUnidade && examesUnidade.length > 0) {
          const opcoes = examesUnidade
            .map(exameUnidade => 
              ({ ds_opcao: `${exameUnidade.unidade.nm_unidade} - ${exameUnidade.unidade.nm_rua}, ${exameUnidade.unidade.cd_numero} ${exameUnidade.unidade.ds_complemento || "" } (${exameUnidade.unidade.nm_cidade}/${exameUnidade.unidade.nm_estado})`, vl_opcao: exameUnidade.id_unidade }));

          return {
            respostaTexto: `Entendi, vamos começar! Primeiro clique na unidade em que deseja realizar o seu exame, achei essa${opcoes.length > 1 ? 's' : ''} no meu caderninho`,
            executadoComSucesso: true,
            memoriasTexto: exameCategoria.memoriasTexto,
            memoriasValor: exameCategoria.memoriasValor,
            opcoes
          }
        }

        return {
          respostaTexto: "Depois de procurar em todas as esquinas, colinas e até mesmo em Nárnia, não consegui achar nenhuma unidade que realize esse exame no momento, desculpe.",
          executadoComSucesso: true
        }

      } else {
        return {
          respostaTexto: "Tive um problema para achar o exame que você me informou, poderiamos tentar mais tarde?",
          executadoComSucesso: true
        }
      }

    
    } catch (error) {
      return {
        error,
        executadoComSucesso: false
      }
    }

  }

  // TODO verificar unidade retorno
  async buscarInfosUnidade(params: NoMetodoParams): Promise<NoMetodoReturn>{

    const opcaoUnidadeEntidade = params.classificacao.entidades.find(entidade => entidade.entidade === "@opcao");

    console.log('---- OPCAO', opcaoUnidadeEntidade);

    const idUnidade = parseInt(opcaoUnidadeEntidade.valor.split(':')[1].trim());

    const unidade = await this.unidadesService.getUnidade(idUnidade);

    return {
      respostaTexto: "",
      executadoComSucesso: true,
      memoriasTexto: unidade.nm_unidade,
      memoriasValor: unidade.id_unidade,
    }

  }

  // TODO melhorar verificação dos dados, e trycatch
  async buscaAgendamentoProximo(params: NoMetodoParams): Promise<NoMetodoReturn>{

    const periodoDiaEntidade = params.classificacao.entidades.find(entidade => entidade.entidade === "@periodo_dia");

    const idUnidadeMemoria = params.memoriasIdentidade.find(
      memoria => memoria.nome === "$unidade"
    );

    const idExameMemoria = params.memoriasIdentidade.find(
      memoria => memoria.nome === "$exame"
    );

    const consultasMemoria = params.memoriasIdentidade.find(memoria => memoria.nome === '$consultas_perto');

    const periodoDiaMemoria = params.memoriasIdentidade.find(memoria => memoria.nome === '$periodo_dia');

    let periodoDia = periodoDiaEntidade && periodoDiaEntidade.valor;
    const idUnidade = idUnidadeMemoria ? parseInt(idUnidadeMemoria.valor) : null;
    const idExame = idExameMemoria ? parseInt(idExameMemoria.valor) : null;
    const consultasDescartar = consultasMemoria ? consultasMemoria.valor : [];

    if(!periodoDia){
      periodoDia = periodoDiaMemoria && periodoDiaMemoria.valor;
    }

    const exameUnidadeComAgendas = await this.examesUnidadeService.buscarAgendasExameUnidade(idExame, idUnidade);
    
    let isManha = false;
    let isTarde = false;
    
    if(periodoDia === 'tarde'){
      isTarde = true;
    }
    else if(periodoDia === 'manhã'){
      isManha = true;
    }
    else{
      isManha = true;
      isTarde = true;
    }
    
    let consultasPerto: ConsultaProxima[] = await this.agendasService.acharConsultasMaisProximas(exameUnidadeComAgendas.agendas, isManha, isTarde, consultasDescartar);

    console.log('Consultas perto:', consultasPerto);

    const opcoes = [];
    let texto = '';

    if(consultasPerto.length === 0){

      isManha = true;
      isTarde = true;
      texto = 'Não consegui achar horários para o periodo desejado. ';

      consultasPerto = await this.agendasService.acharConsultasMaisProximas(exameUnidadeComAgendas.agendas, isManha, isTarde, consultasDescartar);

      if(consultasPerto.length === 0){
        return {
          executadoComSucesso: false,
          respostaTexto: 'Tive um problema para achar horários para esse exame, me desculpe, poderia tentar mais tarde?',
          memoriasValor: {
            '$periodo_dia': periodoDia
          }
        }
      }

    }

    for(let i = 0; i < consultasPerto.length; i++){

      const consulta = consultasPerto[i];

      opcoes.push({
        ds_opcao: `${consulta.data} ${consulta.horario}`,
        vl_opcao: i + consultasDescartar.length
      });

    }

    return {
      executadoComSucesso: true,
      respostaTexto: texto,
      opcoes,
      memoriasValor: {
        '$consultas_perto': consultasDescartar.concat(consultasPerto),
        '$periodo_dia': periodoDia
      }
    }

  }

  // TODO melhorar tratamento de excessoes
  async reservarHorarioData(params: NoMetodoParams): Promise<NoMetodoReturn>{

    // const agenda = params.memoriasIdentidade.find(memoria => memoria.nome === '$agenda');
    const unidade = params.memoriasIdentidade.find(memoria => memoria.nome === '$unidade');
    const exame = params.memoriasIdentidade.find(memoria => memoria.nome === '$exame');
    const convenio = params.memoriasIdentidade.find(memoria => memoria.nome === '$convenio');
    // const dataEntidade = params.classificacao.entidades.find(entidade => entidade.entidade === '@data');
    // const horarioEntidade = params.classificacao.entidades.find(entidade => entidade.entidade === '@hora');

    const numeroEntidade = params.classificacao.entidades.find(entidade => entidade.entidade === '@numeros');
    const consultasMemoria = params.memoriasIdentidade.find(memoria => memoria.nome === '$consultas_perto');

    const consultas: ConsultaProxima[] = <ConsultaProxima[]> (consultasMemoria ? consultasMemoria.valor : null);
    const id_unidade = unidade ? unidade.valor : null;
    const id_exame = exame ? exame.valor : null;
    const id_convenio = convenio ? convenio.valor : null;
    const numeroConsulta = numeroEntidade.valor;
    let {data, horario, agendaId} = <ConsultaProxima> consultas[numeroConsulta];

    const consultaId = await this.agendasService.reservarHorarioDiaAgenda(id_unidade, agendaId, data, horario, id_convenio, id_exame);

    return {
      executadoComSucesso: true,
      memoriasValor: {
        '$consulta' : consultaId,
        '$agenda' : agendaId
      }
    }
  }

  async recuperarPacienteSeExistePorCPF(params: NoMetodoParams): Promise<NoMetodoReturn>{

    const cpfEntidade = params.classificacao.entidades.find(entidade => entidade.entidade === '@cpf');
    const memoriaClinica = params.memoriasIdentidade.find(memoria => memoria.nome === '$clinica');

    if(cpfEntidade && memoriaClinica){

      const cpf = (<string>cpfEntidade.valorId).split('.').join('').split('-').join('');

      console.log('CPF TRATADO', cpf);

      const paciente = await this.pacientesService.buscarPacientePorCPF(memoriaClinica.valor, cpf);

      if(paciente){
        return {
          executadoComSucesso: true,
          memoriasValor: paciente.id
        }
      } else {
        return {
          executadoComSucesso: true
        }
      }

    }

  }

  async retornarTextoNomePaciente(params: NoMetodoParams): Promise<NoMetodoReturn>{

    const memoriaPaciente = params.memoriasIdentidade.find((memoria) => memoria.nome === '$paciente');
    const memoriaClinica = params.memoriasIdentidade.find((memoria) => memoria.nome === '$clinica');

    if(memoriaPaciente && memoriaClinica) {

      const idPaciente = memoriaPaciente.valor;
      const idClinica = memoriaClinica.valor;

      try {

        const paciente = await this.pacientesService.buscarPaciente(idClinica, idPaciente);

        if(paciente)
          return {
            executadoComSucesso: true,
            respostaTexto: `${paciente.nm_paciente}`
          }


      } catch (e) {

        return {
          executadoComSucesso: false,
          respostaTexto: `Não consegui buscar o nome do paciente, por favor tente mais tarde`
        }

      }


    }

    return {
      executadoComSucesso: false,
      respostaTexto: `Não consegui buscar o nome do paciente, por favor tente mais tarde`
    }


  }

  async cadastrarPaciente(params: NoMetodoParams): Promise<NoMetodoReturn>{

    const memoriaEmail = params.memoriasIdentidade.find((memoria) => memoria.nome === '$email');
    const memoriaClinica = params.memoriasIdentidade.find((memoria) => memoria.nome === '$clinica');
    const memoriaCpf = params.memoriasIdentidade.find((memoria) => memoria.nome === '$cpf');
    const memoriaNomePaciente = params.memoriasIdentidade.find((memoria) => memoria.nome === '$nome_paciente');

    if(memoriaClinica && memoriaEmail && memoriaCpf && memoriaNomePaciente){

      const idClinica = memoriaClinica.valor;
      const email = memoriaEmail.valor;
      const cpf = memoriaCpf.valor;
      const nome = memoriaNomePaciente.valor;

      try {

        const paciente = await this.pacientesService.cadastrarPacienteByChat(idClinica, cpf, nome, email);

        return {
          executadoComSucesso: true,
          memoriasValor: paciente.id
        }

      } catch (e) {

        console.error(e);

        return {
          executadoComSucesso: false,
          respostaTexto: 'Infelizmente tive um problema ao salvar o cadastro do paciente, tente novamente mais tarde.'
        }

      }

    } else {

      return {
        executadoComSucesso: false,
        respostaTexto: 'Infelizmente tive um problema ao salvar o cadastro do paciente, tente novamente mais tarde.'
      }

    }

  }

  async finalizarAgendamento(params: NoMetodoParams): Promise<NoMetodoReturn>{

    const agenda = params.memoriasIdentidade.find(memoria => memoria.nome === '$agenda');
    const clinica = params.memoriasIdentidade.find(memoria => memoria.nome === '$clinica');
    const unidade = params.memoriasIdentidade.find(memoria => memoria.nome === '$unidade');
    const consulta = params.memoriasIdentidade.find(memoria => memoria.nome === '$consulta');
    const paciente = params.memoriasIdentidade.find(memoria => memoria.nome === '$paciente')

    const consultaId = parseInt(consulta.valor);
    const agendaId = parseInt(agenda.valor);
    const unidadeId = parseInt(unidade.valor);
    const clinicaId = parseInt(clinica.valor);
    const pacienteId = parseInt(paciente.valor);

    const pacienteData = await this.pacientesService.buscarPaciente(clinicaId, pacienteId);

    const consultaSalva = await this.agendasService.finalizarAgendamento(unidadeId, agendaId, consultaId, pacienteData);

    console.log("------ EXAME: ", consultaSalva.exame, 'Data:', typeof consultaSalva.dt_consulta);

    const dataSplit = consultaSalva.dt_consulta.split('-');

    const resposta = `Concluimos o agendamento com sucesso${consultaSalva.status.id !== 1 ? `, o seu agendamento passará por análise e entraremos em contato quando estiver tudo certo, não se preocupe isso tudo é rapidinho e seu horário já está reservado.` : `.`}
    Seu agendamento foi feito para o dia ${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]} às ${consultaSalva.hr_consulta.substr(0, 5)}. 
    Algumas informações do exame: 
    Observações: ${consultaSalva.exame.ds_observacao}
    Preparos: ${consultaSalva.exame.ds_preparo}`;

    return {
      executadoComSucesso: true,
      respostaTexto: resposta,
    }

  }

  async retornaCategoriasExame(params: NoMetodoParams): Promise<NoMetodoReturn>{

    const examesEntidade = params.classificacao.entidades.filter(entidade => entidade.entidade === '@exames');

    const exames: Exame[] = [];

    for(let exameEntidade of examesEntidade){

      const exame = await this.examesService.buscarExame(exameEntidade.valorId);

      let found = false;

      for(let i = 0; i < exames.length; i++){
        found = exames[i].id_exame === exame.id_exame;
        if(found)
          break;
      }


      if(!found)
        exames.push(exame);

    }

    console.log('EXAMES:',exames);

    const opcoes = [];

    for(let i = 0; i < exames.length; i++){

      opcoes.push({
        vl_opcao: i,
        ds_opcao: exames[i].categoria.nm_categoria
      });

    }

    return {
      executadoComSucesso: true,
      opcoes,
      memoriasValor: {
        '$exames_opcoes': exames
      }
    }

  }

  async selecionaCategoriaExame(params: NoMetodoParams): Promise<NoMetodoReturn>{

    const opcaoEntidade = params.classificacao.entidades.find(entidade => entidade.entidade === '@opcao');

    const exameOpcaoMemoria = params.memoriasIdentidade.find(memoria => memoria.nome === '$exames_opcoes');

    const opcao = parseInt(opcaoEntidade.valor.split(':')[1].trim());
    const exames: Exame[] = exameOpcaoMemoria.valor;

    return {
      executadoComSucesso: true,
      memoriasValor: {
        '$exame': exames[opcao].id_exame,
        '$categoria': exames[opcao].categoria.id_categoria
      }
    }

  }

}
