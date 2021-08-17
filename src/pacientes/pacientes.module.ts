import { Module } from '@nestjs/common';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  controllers: [PacientesController],
  providers: [PacientesService]
})
export class PacientesModule {}
