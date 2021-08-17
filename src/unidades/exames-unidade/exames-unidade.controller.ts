import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ExamesUnidadeService } from './exames-unidade.service';
import { ExameUnidadeDTO } from './exame-unidade.dto';

@Controller('unidades/:id_unidade/exames')
export class ExamesUnidadeController {

  constructor(private readonly examesUnidadeService: ExamesUnidadeService){ }
  
  @Get('convenios')
  buscarConvenios(@Param('id_unidade') id:number){
    return this.examesUnidadeService.buscarConveniosUnidade(id);
  }
  
  @Get()
  buscarExamesUnidade(@Param('id_unidade') id_unidade: number){
    return this.examesUnidadeService.buscarTodosExamesUnidade(id_unidade);
  }

  @Get(':id_exame')
  buscarExameUnidade(@Param('id_unidade') id_unidade: number, @Param('id_exame') id_exame: number){
    return this.examesUnidadeService.buscarExameUnidade(id_unidade, id_exame);
  }

  @Post()
  novoExameUnidade(@Param('id_unidade') id_unidade: number, @Body() exameUnidade: ExameUnidadeDTO){
    return this.examesUnidadeService.novoExameUnidade(id_unidade, exameUnidade);
  }

  @Delete(':id_exame')
  removerExameUnidade(@Param('id_unidade') id_unidade: number, @Param('id_exame') id_exame){
    return this.examesUnidadeService.removerExameUnidade(id_unidade, id_exame);
  }

  @Patch(':id_exame')
  atualizarExameUnidade(@Param('id_unidade') id_unidade: number, @Param('id_exame') id_exame, @Body() exameUnidade: ExameUnidadeDTO){
    return this.examesUnidadeService.atualizarExameUnidade(id_unidade, id_exame, exameUnidade);
  }


}
