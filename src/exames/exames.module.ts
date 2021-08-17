import { Module } from '@nestjs/common';
import { ExamesController } from './exames.controller';
import { ExamesService } from './exames.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exame } from './exame.entity';
import { Categoria } from '../categorias/categoria.entity';
import { SinonimoExame } from './sinonimo-exame.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exame, Categoria, SinonimoExame])],
  controllers: [ExamesController],
  providers: [ExamesService],
  exports: [ExamesService]
})
export class ExamesModule {}
