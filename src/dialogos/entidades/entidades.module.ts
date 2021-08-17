import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entidade } from './entidade.entity';
import { ValorEntidade } from './valor-entidade.entity';
import { SinonimoValorEntidade } from './sinonimo-valor-entidade.entity';
import { EntidadesService } from './entidades.service';
import { EntidadesMetodosService } from './entidades-metodos/entidades-metodos.service';
import { CategoriasModule } from '../../categorias/categorias.module';
import { ConveniosModule } from '../../convenios/convenios.module';
import { ClinicasModule } from '../../clinicas/clinicas.module';
import { ExamesUnidadeModule } from '../../unidades/exames-unidade/exames-unidade.module';
import { EntidadesController } from './entidades.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entidade, ValorEntidade, SinonimoValorEntidade])
  ],
  providers: [EntidadesService, EntidadesMetodosService],
  exports: [EntidadesService],
  controllers: [EntidadesController]
})
export class EntidadesModule {}
