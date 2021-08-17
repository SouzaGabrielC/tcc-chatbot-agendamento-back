import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';
import { AgendaTempo } from './agenda-tempo.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AgendaExameDTO } from './agenda-exame.dto';
import { ExameUnidade } from '../unidades/exames-unidade/exame-unidade.entity';
import { Consulta } from '../consultas/consulta.entity';
import { Convenio } from '../convenios/convenio.entity';
import { Status } from '../status/status.entity';

export interface ConsultaProxima {
  agendaId: number,
  data: string,
  horario: string
};

@Injectable()
export class AgendasService extends TypeOrmCrudService<Agenda> {
  constructor(
    @InjectRepository(Agenda) private agendasRepository: Repository<Agenda>,
    @InjectRepository(ExameUnidade)
    private readonly exameUnidadeRepository: Repository<ExameUnidade>,
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    @InjectRepository(Convenio)
    private readonly convenioRepository: Repository<Convenio>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(AgendaTempo)
    private readonly agendasTempos: Repository<AgendaTempo>,
  ) {
    super(agendasRepository);
  }

  // todo criar agenda

  // todo remover agenda

  // todo atualizar agenda

  pegarTodasAgendasUnidade(id_unidade: number) {
    return this.agendasRepository.find({
      id_unidade,
    });
  }

  async adicionarExameNaAgenda(
    id_unidade: number,
    id_agenda: number,
    agendaExame: AgendaExameDTO,
  ) {
    const agenda = await this.agendasRepository.findOneOrFail(
      {
        id: id_agenda,
        id_unidade,
      },
      {
        relations: ['unidade', 'examesUnidade'],
      },
    );

    const exameUnidade = await this.exameUnidadeRepository.findOneOrFail(
      {
        unidade: {
          id_unidade: agendaExame.id_unidade,
        },
        exame: {
          id_exame: agendaExame.id_exame,
        },
      },
      {
        relations: ['unidade', 'exame'],
      },
    );

    if (agenda.unidade.id_unidade === exameUnidade.unidade.id_unidade) {
      agenda.examesUnidade.push(exameUnidade);

      return this.agendasRepository.save(agenda);
    } else {
      throw new HttpException(
        'Exame precisa ser da mesma unidade da agenda',
        500,
      );
    }
  }

  async removerExameDaAgenda(
    id_unidade: number,
    id_agenda: number,
    agendaExame: AgendaExameDTO,
  ) {
    const agenda = await this.agendasRepository.findOneOrFail(
      {
        id: id_agenda,
        id_unidade,
      },
      {
        relations: ['unidade', 'examesUnidade'],
      },
    );

    agenda.examesUnidade.slice(
      agenda.examesUnidade.findIndex(
        exameUnidade =>
          exameUnidade.exame.id_exame === agendaExame.id_exame &&
          exameUnidade.unidade.id_unidade === agendaExame.id_unidade,
      ),
      1,
    );

    return this.agendasRepository.save(agenda);
  }

  listarTodosExamesDaAgenda(id_unidade: number, id_agenda: number) {
    return this.agendasRepository.findOne({
      where: {
        id: id_agenda,
        id_unidade,
      },
      relations: ['examesUnidade'],
    });
  }

  pegarConsultasDiaAgenda(id_unidade: number, id_agenda: number, data: string | Date) {

    const consultasDate = typeof data === 'string' ? new Date(data + 'T00:00:00') : data;

    return this.consultaRepository.find({
      where: {
        id_agenda,
        id_unidade,
        dt_consulta: consultasDate,
      },
      relations: ['paciente', 'convenio', 'status', 'exame'],
    });
  }

  // TODO refazer o codigo para melhor pegar os dias e horarios e possibilitar pegar novos horarios não repetidos

  async acharConsultasMaisProximas(
    agendas: Agenda[],
    periodoManha: boolean,
    periodoTarde: boolean,
    consultasDescartadas: ConsultaProxima[]) : Promise<ConsultaProxima[]>
  {

    const hrInicioPeriodo = periodoManha ? 0 : 13;
    const hrFimPeriodo = periodoTarde ? 23 : 12;

    if(agendas && agendas.length > 0){

      const dataInicioPesquisa = new Date();

      const consultasProximasDasAgendas = {};

      let consultasProximasEscolhidas = [];

      dataInicioPesquisa.setMinutes(0);
      dataInicioPesquisa.setHours(0);
      dataInicioPesquisa.setSeconds(0);

      for(const agenda of agendas){

        let consultasProximasAgenda : ConsultaProxima[] = [];

        const temposAgenda = agenda.tempos;

        if(temposAgenda && temposAgenda.length > 0){

          const temposNoPeriodoEscolhido = temposAgenda.reduce((prev, tempo) => {

            const hrInicio = parseInt(tempo.hr_inicio_agenda.substr(0,2));
            const hrFim = parseInt(tempo.hr_fim_agenda.substr(0,2));

            if((hrInicio >= hrInicioPeriodo && hrInicio <= hrFimPeriodo) || (hrFim <= hrFimPeriodo && hrFim >= hrInicioPeriodo)){
              return prev + 1;
            } else {
              return prev;
            }

          }, 0);

          if(temposNoPeriodoEscolhido === 0){
            continue;
          }

          const dataPesquisa = new Date(dataInicioPesquisa.getTime());

          do {

            dataPesquisa.setDate(dataPesquisa.getDate() + 1);

            const tempoDoDia = temposAgenda.find(tempo => tempo.dia_semana === dataPesquisa.getDay());

            if(tempoDoDia){

              const dataPesquisaSplit = dataPesquisa.toISOString().substr(0, 10).split('-');
              const dataPesquisaString = `${dataPesquisaSplit[2]}/${dataPesquisaSplit[1]}/${dataPesquisaSplit[0]}`;

              const consultasDoDia = await this.pegarConsultasDiaAgenda(agenda.id_unidade, agenda.id, dataPesquisa);

              const horaDiaAgendaInicio = parseInt(tempoDoDia.hr_inicio_agenda.substr(0, 2));
              const horaDiaAgendaFim = parseInt(tempoDoDia.hr_fim_agenda.substr(0,2));
              const minDiaAgendaInicio = parseInt(tempoDoDia.hr_inicio_agenda.substr(3,2));
              const minDiaAgendaFim = parseInt(tempoDoDia.hr_fim_agenda.substr(3,2));

              const inicioAgendaEmMinutos = horaDiaAgendaInicio * 60 + minDiaAgendaInicio;
              const fimAgendaEmMinutos = horaDiaAgendaFim * 60 + minDiaAgendaFim;

              const consultasMarcadasPeriodo = consultasDoDia.filter(
                consulta => {
                  const horaConsulta = parseInt(consulta.hr_consulta.substr(0, 2))
                  return horaConsulta <= hrFimPeriodo && horaConsulta >= hrInicioPeriodo
                }
              );

              const hrInicioPeriodoEmMinutos = hrInicioPeriodo * 60;
              const hrFimPeriodoEmMinutos = hrFimPeriodo * 60 + 59;

              const hrInicioEmMinutos = (hrInicioPeriodoEmMinutos > inicioAgendaEmMinutos ? hrInicioPeriodoEmMinutos : inicioAgendaEmMinutos);
              const hrFimEmMinutos = (hrFimPeriodoEmMinutos < fimAgendaEmMinutos ? hrFimPeriodoEmMinutos : fimAgendaEmMinutos)

              let qtMaximaConsultasPeriodo = (hrFimEmMinutos - hrInicioEmMinutos) / tempoDoDia.cd_tempo_consulta;

              qtMaximaConsultasPeriodo = Math.trunc(qtMaximaConsultasPeriodo) + 1;

              if(consultasMarcadasPeriodo.length < qtMaximaConsultasPeriodo){

                let horariosConsultas = [];
                const horariosConsultasMarcadas = [];

                for (const consulta of consultasMarcadasPeriodo) {
                  horariosConsultasMarcadas.push(consulta.hr_consulta.substr(0, 5));
                }

                for(let i = 0; i < qtMaximaConsultasPeriodo; i++){

                  const horario = hrInicioEmMinutos + (i * tempoDoDia.cd_tempo_consulta);

                  const indexFound = horariosConsultasMarcadas.findIndex(hrConsulta => hrConsulta === horario);

                  if(indexFound === -1)
                    horariosConsultas.push(
                      horario
                    );

                }

                horariosConsultas = horariosConsultas.filter(
                  horarioConsulta => {

                    let hora = Math.trunc(horarioConsulta/60);
                    let minutos = horarioConsulta - hora * 60;

                    return consultasDescartadas.findIndex(
                      descartada => descartada.data === dataPesquisaString && descartada.horario === `${('0'+hora).slice(-2)}:${('0'+minutos).slice(-2)}`
                    ) === -1
                  }
                );


                if(horariosConsultas.length > 0){

                  let randomIndex = Math.random() * (horariosConsultas.length - 1);

                  let horarioEmMinutos = horariosConsultas.splice(randomIndex, 1)[0];
                  let hora = Math.trunc(horarioEmMinutos/60);
                  let minutos = horarioEmMinutos - hora * 60;

                  consultasProximasAgenda.push({
                    agendaId: agenda.id,
                    data: dataPesquisaString,
                    horario: `${('0'+hora).slice(-2)}:${('0'+minutos).slice(-2)}`
                  });

                  if(consultasProximasAgenda.length < 4){

                    randomIndex = Math.random() * (horariosConsultas.length - 1);

                    horarioEmMinutos = horariosConsultas.splice(randomIndex, 1)[0];
                    hora = Math.trunc(horarioEmMinutos/60);
                    minutos = horarioEmMinutos - hora * 60;

                    consultasProximasAgenda.push({
                      agendaId: agenda.id,
                      data: dataPesquisaString,
                      horario: `${('0'+hora).slice(-2)}:${('0'+minutos).slice(-2)}`
                    });

                  }

                }

              }

            }

          } while(consultasProximasAgenda.length < 4);

        }

        consultasProximasDasAgendas[agenda.id] = consultasProximasAgenda;

      }

      Object.keys(consultasProximasDasAgendas).forEach(agendaId => {

        let consultasProximasAgenda = <ConsultaProxima[]> consultasProximasDasAgendas[agendaId];

        if(consultasProximasEscolhidas.length === 0){
          consultasProximasEscolhidas = consultasProximasAgenda;
          return;
        }

        for(let i = 0; i < consultasProximasAgenda.length; i++){

          const [diaEscolhida, mesEscolhida, anoEscolhida] = consultasProximasEscolhidas[i].data.split('/');
          const [diaAgenda, mesAgenda, anoAgenda] = consultasProximasAgenda[i].data.split('/');

          if(anoEscolhida > anoAgenda){
            consultasProximasEscolhidas[i] = consultasProximasAgenda[i];
            continue;
          }

          if(mesEscolhida > mesAgenda){
            consultasProximasEscolhidas[i] = consultasProximasAgenda[i];
            continue;
          }

          if(diaEscolhida > diaAgenda){
            consultasProximasEscolhidas[i] = consultasProximasAgenda[i];
            continue;
          }

        }


      });




      return consultasProximasEscolhidas;

    } else {
      throw new Error('Não possui agendas para pesquisar!');
    }


  }


  // async acharConsultasProximasDasAgendas(
  //   agendas: Agenda[],
  //   hrInicio: number,
  //   hrFim: number,
  //   arrayHorariosDescartados: string[]
  // ) {
  //
  //   const dataConsultas = new Date();
  //
  //   dataConsultas.setDate(dataConsultas.getDate() + 2);
  //
  //   dataConsultas.setDate(
  //     dataConsultas.getDate() +
  //     (dataConsultas.getDay() === 0 ? 1 : 0) +
  //     (dataConsultas.getDay() === 6 ? 2 : 0)
  //   );
  //
  //   let horariosDia = [];
  //
  //   for (const agenda of agendas) {
  //
  //     let dia = 0;
  //     let diaFinal = 2;
  //
  //     horariosDia = [];
  //
  //     while (dia < diaFinal) {
  //
  //       const dataInicial = new Date(dataConsultas);
  //       const dataFim = new Date(dataConsultas);
  //
  //       dataInicial.setDate(dataInicial.getDate() + dia);
  //       dataFim.setDate(dataFim.getDate() + dia);
  //
  //       dataInicial.setDate(
  //         dataInicial.getDate() +
  //         (dataInicial.getDay() === 0 ? 1 : 0) +
  //         (dataInicial.getDay() === 6 ? 2 : 0)
  //       );
  //
  //       dataFim.setDate(
  //         dataFim.getDate() +
  //         (dataFim.getDay() === 0 ? 1 : 0) +
  //         (dataFim.getDay() === 6 ? 2 : 0)
  //       );
  //
  //       const horaInicioAgenda = parseInt(agenda.hr_inicio_agenda.substring(0, 2));
  //       const horaFimAgenda = parseInt(agenda.hr_fim_agenda.substring(0, 2));
  //
  //       dataInicial.setHours(
  //         horaInicioAgenda > hrInicio ? horaInicioAgenda : hrInicio,
  //         parseInt(agenda.hr_inicio_agenda.substring(3, 5))
  //       );
  //
  //       dataFim.setHours(
  //         horaFimAgenda < hrFim ? horaFimAgenda : hrFim,
  //         parseInt(agenda.hr_fim_agenda.substring(3, 5))
  //       );
  //
  //       const minutosDeAgenda =
  //         (dataFim.getTime() - dataInicial.getTime()) / 60000;
  //
  //       const qtConsultas = minutosDeAgenda / agenda.cd_tempo_consulta;
  //
  //       const consultasDiaAgenda = await this.pegarConsultasDiaAgenda(agenda.id_unidade, agenda.id, dataConsultas.toISOString().substr(0, 10))
  //
  //       const consultasMarcadas = consultasDiaAgenda.filter(
  //         consulta => {
  //           const horaConsulta = parseInt(consulta.hr_consulta.substr(0, 2))
  //           return horaConsulta <= hrFim && horaConsulta >= hrInicio
  //         }
  //       );
  //
  //       const qtConsultasMarcadas = consultasMarcadas.length;
  //
  //       if (qtConsultasMarcadas >= qtConsultas)
  //         continue;
  //
  //       const horarios = [];
  //       const horariosConsulta = [];
  //
  //       for (const consulta of consultasMarcadas) {
  //         horariosConsulta.push(consulta.hr_consulta.substr(0, 5));
  //       }
  //
  //       for (let i = 0; i <= qtConsultas; i++) {
  //         const dataItem = new Date(dataInicial.getTime());
  //
  //         dataItem.setTime(
  //           dataInicial.getTime() + i * agenda.cd_tempo_consulta * 60000
  //         );
  //
  //         const horario = `${("0" + dataItem.getHours()).slice(-2)}:${("0" + dataItem.getMinutes()).slice(-2)}`;
  //
  //
  //         if (!(horariosConsulta.find(val => val === horario))) {
  //           horarios.push(horario);
  //         }
  //
  //       }
  //
  //       if (horarios.length > 0) {
  //
  //         const random = () => Math.round(Math.random() * (horarios.length - 1));
  //
  //         const horariosEscolhidos = [];
  //
  //         if(horarios.length > 1){
  //
  //           const escolhido1 = horarios[random()];
  //
  //           horariosEscolhidos.push(escolhido1);
  //
  //           let escolhido2;
  //
  //           do{
  //
  //             escolhido2 = horarios[random()];
  //
  //           } while(escolhido2 === escolhido1);
  //
  //           horariosEscolhidos.push(escolhido2);
  //
  //         }
  //         else{
  //           horariosEscolhidos.push(horarios[0]);
  //         }
  //
  //         horariosDia.push({
  //           agendaId: agenda.id,
  //           dia: dataInicial.toISOString().substr(0, 10),
  //           horarios: horariosEscolhidos
  //         });
  //
  //         if(horariosEscolhidos.length === 1){
  //           diaFinal = diaFinal < 4 ? diaFinal++ : diaFinal;
  //         }
  //
  //       }
  //
  //       dia++;
  //
  //     }
  //
  //     if(horariosDia.length > 0){
  //       let contHorarios = 0;
  //       for(const horarioDia of horariosDia){
  //         contHorarios += horarioDia.horarios.length;
  //       }
  //
  //       if(contHorarios === 4){
  //         break;
  //       }
  //
  //     }
  //
  //   }
  //
  //   return horariosDia;
  //
  // }


  async reservarHorarioDiaAgenda(id_unidade, id_agenda, data, hora, id_convenio?, id_exame?){

    const novaConsulta = new Consulta();

    const dataFormatada = data.split('/').reverse().join('-');

    novaConsulta.id_unidade = id_unidade;
    novaConsulta.id_agenda = id_agenda;
    novaConsulta.dt_consulta = dataFormatada;
    novaConsulta.hr_consulta = hora;

    novaConsulta.convenio = await this.convenioRepository.findOne({
      id_convenio
    });

    novaConsulta.exame = await this.exameUnidadeRepository.findOne({
      id_exame,
      id_unidade
    });

    novaConsulta.status = await this.statusRepository.findOne({
      id: 7
    });

    return (await this.consultaRepository.save(novaConsulta)).id;

  }

  async finalizarAgendamento(id_unidade, id_agenda, id_consulta, paciente){

    const consulta = await this.consultaRepository.findOne({
      id_agenda,
      id_unidade,
      id: id_consulta
    });

    const agenda = await this.agendasRepository.findOne({
      id: id_agenda,
      id_unidade
    });

    consulta.paciente = paciente;

    let statusId = agenda.ic_agendamento_automatico ? 1 : 9;

    const status = await this.statusRepository.findOne({
      id: statusId
    });

    consulta.status = status;

    await this.consultaRepository.save(consulta);

    return this.consultaRepository.findOne({
      id_agenda,
      id_unidade,
      id: id_consulta
    },
    {
      relations: ['exame', 'status']
    });

  }

  async aprovarAgendamento(id_unidade, id_agenda, id_consulta){
    
    const consulta = await this.consultaRepository.findOne({
      id: id_consulta,
      id_agenda,
      id_unidade
    });

    const status = await this.statusRepository.findOne({
      id: 1
    });

    consulta.status = status;

    return this.consultaRepository.save(consulta);

  }

}
