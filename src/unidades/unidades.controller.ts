import { Controller, Get, Param, Logger, Post, Body, Delete, Patch, Put } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { UnidadeDTO } from './unidade.dto';
import { Unidade } from './unidade.entity';
import { AgendaExameDTO } from '../agendas/agenda-exame.dto';
import { AgendasService } from '../agendas/agendas.service';

@Controller('unidades')
export class UnidadesController {

  constructor(
    private readonly unidadesService: UnidadesService,
    private readonly agendaService: AgendasService
    ){ }

  @Get()
  getUnidades(){
    return this.unidadesService.getUnidades();
  }

  @Get(':id_unidade')
  getUnidade(@Param('id_unidade') id_unidade: number){
    return this.unidadesService.getUnidade(id_unidade);
  }

  @Post()
  novaUnidade(@Body() unidade: UnidadeDTO){
    return this.unidadesService.novaUnidade(unidade);
  }

  @Delete(':id_unidade')
  deleteUnidade(@Param('id_unidade') id: number){
    return this.unidadesService.removeUnidade(id);
  }

  @Patch(':id_unidade')
  atualizarUnidade(@Param('id_unidade') id: number, @Body() unidade: UnidadeDTO): Promise<Unidade>{
    return this.unidadesService.atualizarUnidade(id, unidade);
  }

  @Post(':id_unidade/medicos')
  adicionarMedicoUnidade(@Param('id_unidade') id_unidade: number, @Body('id_medico') id_medico: number){
    return this.unidadesService.adicionarMedicoUnidade(id_unidade, id_medico);
  }

  @Get(':id_unidade/medicos')
  medicosUnidade(@Param('id_unidade') id: number){
    return this.unidadesService.buscarMedicosUnidade(id);
  }

  @Delete(':id_unidade/medicos/:id_medico')
  removerMedicoUnidade(@Param('id_unidade') id_unidade: number, @Param('id_medico') id_medico: number){
    return this.unidadesService.removerMedicoUnidade(id_unidade, id_medico);
  }

  @Get(':id_unidade/agendas')
  getAgendasUnidade(@Param('id_unidade') id_unidade: number){
    return this.agendaService.pegarTodasAgendasUnidade(id_unidade);
  }

  @Get(':id_unidade/agendas/:id_agenda/exames')
  buscarExamesAgenda(@Param('id_unidade') id_unidade: number, @Param('id_agenda') id_agenda: number){
    return this.agendaService.listarTodosExamesDaAgenda(id_unidade, id_agenda);
  }

  @Post(':id_unidade/agendas/:id_agenda/exames')
  adicionarExame(@Param('id_unidade') id_unidade: number, @Param('id_agenda') id_agenda: number, @Body() agendaExame: AgendaExameDTO){
    return this.agendaService.adicionarExameNaAgenda(id_unidade, id_agenda, agendaExame);
  }

  @Delete(':id_unidade/agendas/:id_agenda/exames')
  removerExame(@Param('id_unidade') id_unidade: number, @Param('id_agenda') id_agenda: number, @Body() agendaExame: AgendaExameDTO){
    return this.agendaService.removerExameDaAgenda(id_unidade, id_agenda, agendaExame);
  }

  @Get(':id_unidade/agendas/:id_agenda/consultas/data/:dt_consultas')
  getConsultasAgendaDia(@Param('id_unidade') id_unidade: number, @Param('id_agenda') id_agenda: number, @Param('dt_consultas') dt_consultas: string){

    return this.agendaService.pegarConsultasDiaAgenda(id_unidade, id_agenda, dt_consultas);

  }

  @Put(':id_unidade/agendas/:id_agenda/consultas/:id_consulta/aprovar')
  aprovarConsulta(@Param('id_unidade') id_unidade: number, @Param('id_agenda') id_agenda: number, @Param('id_consulta') id_consulta: number){

    return this.agendaService.aprovarAgendamento(id_unidade, id_agenda, id_consulta);

  }

}
