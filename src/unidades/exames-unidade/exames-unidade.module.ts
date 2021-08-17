import { Module } from '@nestjs/common';
import { ExamesUnidadeController } from './exames-unidade.controller';
import { ExamesUnidadeService } from './exames-unidade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExameUnidade } from './exame-unidade.entity';
import { Unidade } from '../unidade.entity';
import { Exame } from '../../exames/exame.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExameUnidade, Unidade, Exame])],
  controllers: [ExamesUnidadeController],
  providers: [ExamesUnidadeService],
  exports: [ExamesUnidadeService]
})
export class ExamesUnidadeModule {}
