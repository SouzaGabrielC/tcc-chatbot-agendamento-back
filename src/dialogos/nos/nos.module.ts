import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { No } from './no.entity';
import { NosController } from './nos.controller';
import { RespostasModule } from './respostas/respostas.module';
import { NosService } from './nos.service';
import { Resposta } from './respostas/resposta.entity';
import { Memoria } from './memoria.entity';
import { NosMetodosService } from './nos-metodos/nos-metodos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([No, Resposta, Memoria]), 
    RespostasModule
  ],
  controllers: [NosController],
  providers: [NosService, NosMetodosService],
  exports: [NosService]
})
export class NosModule {}
