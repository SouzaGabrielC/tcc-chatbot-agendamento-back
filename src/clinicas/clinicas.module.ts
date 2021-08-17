import { Module } from '@nestjs/common';
import { ClinicasController } from './clinicas.controller';
import { ClinicasService } from './clinicas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinica } from './clinica.entity';
import { BotsModule } from '../bots/bots.module';

@Module({
  controllers: [ClinicasController],
  providers: [ClinicasService],
  imports: [TypeOrmModule.forFeature([Clinica]), BotsModule],
  exports: [ClinicasService]
})
export class ClinicasModule {}
