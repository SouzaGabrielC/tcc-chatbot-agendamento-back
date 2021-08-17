import { Module } from '@nestjs/common';
import { MensagensModule } from './mensagens/mensagens.module';
import { SalasService } from './salas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sala } from './sala.entity';
import { Mensagem } from './mensagens/mensagem.entity';

@Module({
  imports: [MensagensModule, TypeOrmModule.forFeature([Sala, Mensagem])],
  providers: [SalasService],
  exports: [SalasService]
})
export class SalasModule {}
