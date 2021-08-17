import { Controller, Inject, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { EntidadesService } from './entidades.service';
import { EntidadeDTO } from './entidade.dto';

@Controller('entidades')
export class EntidadesController {

  constructor(private readonly service: EntidadesService){ }

  @Get()
  pegarTodasEntidadeDoSistema(){
    return this.service.buscarTodasEntidadesDoSistema();
  }

  @Post()
  criarEntidade(@Body() entidade: EntidadeDTO){
    return this.service.criarEntidade(entidade);
  }

  @Delete(':id_entidade')
  deletarEntidade(@Param('id_entidade') id_entidade: number){
    return this.service.removerEntidade(id_entidade);
  }

}
