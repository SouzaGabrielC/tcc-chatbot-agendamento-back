import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidade } from './unidade.entity';
import { UnidadesController } from './unidades.controller';
import { UnidadesService } from './unidades.service';
import { ExamesUnidadeModule } from './exames-unidade/exames-unidade.module';
import { Clinica } from '../clinicas/clinica.entity';
import { Medico } from '../medicos/medico.entity';
import { Agenda } from '../agendas/agenda.entity';
import { Consulta } from '../consultas/consulta.entity';
import { ExameUnidade } from './exames-unidade/exame-unidade.entity';
import { AgendasModule } from '../agendas/agendas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unidade, Clinica, Medico, Agenda, Consulta, ExameUnidade]), 
    ExamesUnidadeModule,
    AgendasModule],
  controllers: [UnidadesController],
  providers: [UnidadesService],
  exports: [UnidadesService]
})
export class UnidadesModule {}
