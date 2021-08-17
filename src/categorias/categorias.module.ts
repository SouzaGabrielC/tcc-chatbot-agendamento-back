import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { ExamesModule } from '../exames/exames.module';
import { SinonimoCategoria } from './sinonimo-categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, SinonimoCategoria]), ExamesModule],
  providers: [CategoriasService],
  controllers: [CategoriasController],
  exports: [CategoriasService]
})
export class CategoriasModule {}
