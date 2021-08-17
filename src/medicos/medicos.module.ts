import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],
  providers: [MedicosService],
  controllers: [MedicosController]
})
export class MedicosModule {}
