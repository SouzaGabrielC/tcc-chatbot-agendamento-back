import { Controller, Get, Logger, Post, Body, Delete, Param, Patch, Inject, forwardRef } from '@nestjs/common';
import { ClinicasService } from './clinicas.service';
import { Clinica } from './clinica.entity';
import { BotsService } from '../bots/bots.service';

@Controller('clinicas')
export class ClinicasController {

  constructor(
    private readonly clinicasService: ClinicasService,
    private readonly botsService: BotsService
  ) { }

  @Post()
  novaClinica(@Body('nm_clinica') nome: string): Promise<Clinica> {
    return this.clinicasService.novaClinica(nome);
  }

  @Delete(':id')
  removeClinica(@Param('id') id: number): Promise<Clinica>{
    return this.clinicasService.removerClinica(id);
  }

  @Get()
  getClinicas(): Promise<Clinica[]>{
    return this.clinicasService.buscarTodasClinicas();
  }

  @Get(':id')
  getClinica(@Param('id') id: number): Promise<Clinica>{
    return this.clinicasService.buscarClinica(id);
  }

  @Patch(':id')
  atualizarClinica(@Param('id') id: number, @Body('nm_clinica') nm_clinica: string) {
    return this.clinicasService.atualizarClinica(id, nm_clinica);
  }

  @Get(":id/unidades")
  buscarTodasUnidades(@Param('id') id){
    return this.clinicasService.buscarClinicaComTodasUnidades(id);
  }

  @Get(":id/bots")
  buscarTodosBots(@Param('id') id){
    return this.botsService.buscarTodosBotsClinica(id);
  }

  @Delete(':id/bots/:id_bot')
  deletarBotClinica(@Param('id') id: number, @Param('id_bot') id_bot){
    return this.botsService.deletarBotClinica(id, id_bot);
  }

}
