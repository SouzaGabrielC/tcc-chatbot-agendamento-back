import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicoDTO } from './medico.dto';

@Controller('medicos')
export class MedicosController {

  constructor(private readonly medicosService: MedicosService){ }

  @Get()
  buscarMedicos(){
    return this.medicosService.buscarTodosMedicos();
  }

  @Get(':id')
  buscarMedico(@Param('id') id: number){
    return this.medicosService.buscarMedico(id);
  }

  @Post()
  novoMedico(@Body() medico: MedicoDTO){
    return this.medicosService.novoMedico(medico);
  }

  @Delete(':id')
  removerMedico(@Param('id') id: number){
    return this.medicosService.removerMedico(id);
  }

  @Patch(':id')
  atualizarMedico(@Param('id') id: number, @Body() medico: MedicoDTO){
    return this.medicosService.atualizarMedico(id, medico);
  }

  @Get(':id/agendas')
  buscarAgendasMedico(@Param('id') id){
    return this.medicosService.agendasMedico(id);
  }

}
