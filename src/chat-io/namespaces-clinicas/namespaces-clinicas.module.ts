import { Module } from '@nestjs/common';
import { NamespacesClinicasService } from './namespaces-clinicas.service';
import { ClinicasModule } from '../../clinicas/clinicas.module';
import { BotsModule } from '../../bots/bots.module';
import { NosModule } from '../../dialogos/nos/nos.module';
import { SalasModule } from '../../salas/salas.module';

@Module({
  imports: [ClinicasModule, BotsModule, NosModule, SalasModule],
  providers: [NamespacesClinicasService],
  exports: [NamespacesClinicasService]
})
export class NamespacesClinicasModule {}
