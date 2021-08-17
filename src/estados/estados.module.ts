import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from './estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  providers: [EstadosService],
  controllers: [EstadosController]
})
export class EstadosModule {}
