import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ExameDTO } from './exame.dto';
import { ExamesService } from './exames.service';

@Controller('exames')
export class ExamesController {

  constructor(private readonly examesService: ExamesService){ }

  @Get()
  buscarExames(){
    return this.examesService.buscarTodosExames();
  }

  @Get(':id')
  buscarExame(@Param('id') id: number){
    return this.examesService.buscarExame(id);
  }

  @Post()
  novoExame(@Body() exame: ExameDTO){
    return this.examesService.novoExame(exame);
  }

  @Delete(':id')
  removerExame(@Param('id') id: number){
    return this.examesService.removerExame(id);
  }

  @Patch(':id')
  atualizarExame(@Param('id') id: number, @Body() exame: ExameDTO){
    return this.examesService.atualizarExame(id, exame);
  }

}
