import { Controller, Param, Get } from '@nestjs/common';
import { PacientesService } from './pacientes.service';


@Controller('pacientes')
export class PacientesController {
  constructor(private readonly service: PacientesService){ }

  @Get()
  buscarTodos(){
    return this.service.buscarTodos();
  }

  @Get('clinica/:id_clinica')
  buscarTodosClinica(@Param('id_clinica') id_clinica: number){
    return this.service.buscarTodosClinica(id_clinica);
  }

  // @Get(':id_paciente')
  // buscarPaciente(@Param('id_paciente') id_paciente: number){
  //   return this.service.buscarPaciente(id_paciente);
  // }

  

}
