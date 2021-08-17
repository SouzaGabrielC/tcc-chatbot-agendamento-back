import { Module } from '@nestjs/common';
import { IntencoesModule } from './intencoes/intencoes.module';
import { NosModule } from './nos/nos.module';
import { EntidadesModule } from './entidades/entidades.module';
import { DialogosService } from './dialogos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dialogo } from './dialogo.entity';
import { ClassificadorService } from './classificador/classificador.service';

@Module({
  imports: [IntencoesModule, NosModule, EntidadesModule, TypeOrmModule.forFeature([Dialogo])],
  providers: [DialogosService, ClassificadorService],
  exports: [DialogosService]
})
export class DialogosModule {}
