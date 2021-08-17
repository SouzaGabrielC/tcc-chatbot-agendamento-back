import { Controller, Get, Post, Body, Logger, Delete, Param, Patch } from '@nestjs/common';
import { Glossario } from './glossario.entity';
import { GlossarioService } from './glossario.service';

@Controller('glossario')
export class GlossarioController {

  private logger: Logger;

  constructor(private readonly glossarioService: GlossarioService) { 
    this.logger = new Logger("GlossarioController");
  }

  @Get()
  getAll(): Promise<Glossario[]> {
    return this.glossarioService.getAllPalavras();
  }

  @Post()
  newGlossario(@Body('palavra') palavra: string, @Body('descricao') descricao: string): Promise<number> {
    this.logger.log(`Inserindo uma nova palavra no glossario: ${palavra}`);
    return this.glossarioService.novaPalavra(palavra, descricao);
  }

  @Delete(':id')
  async removeGlossario(@Param('id') id: number): Promise< { removido: boolean } >{
    this.logger.log(`Removendo glossario de id: ${id}`);
    return {
      removido: await this.glossarioService.removerPalavra(id)
    }
  }

  @Patch(':id')
  updateGlossario(@Param('id') id, @Body('palavra') palavra, @Body('descricao') descricao): Promise<Glossario>{
    this.logger.log(`Atualizando glossario de id: ${id}`);
    return this.glossarioService.atualizarPalavra(id, palavra, descricao);
  }

}
