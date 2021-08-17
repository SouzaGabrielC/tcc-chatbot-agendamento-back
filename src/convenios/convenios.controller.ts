import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ConveniosService } from './convenios.service';
import { ConvenioDTO } from './convenio.dto';

@Controller('convenios')
export class ConveniosController {

  constructor(private readonly convenioService: ConveniosService){ }

  @Get()
  buscarConvenios(){
    return this.convenioService.buscarTodosConvenios();
  }

  @Get(':id')
  buscarConvenio(@Param('id') id: number){
    return this.convenioService.buscarConvenio(id);
  }

  @Post()
  novoConvenio(@Body() convenio: ConvenioDTO){
    return this.convenioService.novoConvenio(convenio);
  }

  @Delete(':id')
  removerConvenio(@Param('id') id: number){
    return this.convenioService.removerConvenio(id);
  }

  @Patch(':id')
  atualizarConvenio(@Param('id') id: number, @Body() convenio: ConvenioDTO){
    return this.convenioService.atualizarConvenio(id, convenio);
  }

}
