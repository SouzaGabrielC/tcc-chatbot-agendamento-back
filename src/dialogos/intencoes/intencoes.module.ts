import { Module } from '@nestjs/common';
import { IntencoesService } from './intencoes.service';
import { IntencoesController } from './intencoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intencao } from './intecao.entity';
import { Dialogo } from '../dialogo.entity';
import { PerguntasModule } from './perguntas/perguntas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Intencao]), PerguntasModule],
  providers: [IntencoesService],
  controllers: [IntencoesController],
  exports: [IntencoesService]
})
export class IntencoesModule {}
