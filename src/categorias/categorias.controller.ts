import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriaDTO } from './categoria.dto';

@Controller('categorias')
export class CategoriasController {

  constructor(private readonly categoriasService: CategoriasService){ }

  @Get()
  buscarTodas(){
    return this.categoriasService.buscarTodasCategorias();
  }

  @Get(':id')
  buscarCategoria(@Param('id') id: number){
    return this.categoriasService.buscarCategoria(id);
  }

  @Post()
  novaCategoria(@Body() categoria: CategoriaDTO){
    console.log(categoria);
    return this.categoriasService.novaCategoria(categoria);
  }

  @Delete(':id')
  removeCategoria(@Param('id') id: number){
    return this.categoriasService.removerCategoria(id);
  }

  @Patch(':id')
  atualizarCategoria(@Param('id') id: number, @Body() categoria: CategoriaDTO){
    return this.categoriasService.atualizarCategoria(id, categoria);
  }

}
