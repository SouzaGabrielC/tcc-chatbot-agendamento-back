import { Module } from '@nestjs/common';
import { ConveniosService } from './convenios.service';
import { ConveniosController } from './convenios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convenio } from './convenio.entity';
import { SinonimoConvenio } from './sinonimo-convenio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Convenio, SinonimoConvenio])],
  providers: [ConveniosService],
  controllers: [ConveniosController],
  exports: [ConveniosService]
})
export class ConveniosModule {}
