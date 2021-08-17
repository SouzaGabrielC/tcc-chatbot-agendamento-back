import { Module } from '@nestjs/common';
import { AgendasService } from './agendas.service';
import { AgendasController } from './agendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';
import { ExameUnidade } from '../unidades/exames-unidade/exame-unidade.entity';
import { Consulta } from '../consultas/consulta.entity';
import { Convenio } from '../convenios/convenio.entity';
import { Status } from '../status/status.entity';
import { AgendaTempo } from './agenda-tempo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda, ExameUnidade, Consulta, Convenio, Status, AgendaTempo])],
  providers: [AgendasService],
  controllers: [AgendasController],
  exports: [AgendasService]
})
export class AgendasModule {}
