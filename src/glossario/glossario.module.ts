import { Module } from '@nestjs/common';
import { GlossarioController } from './glossario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glossario } from './glossario.entity';
import { GlossarioService } from './glossario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Glossario])],
  controllers: [GlossarioController],
  providers: [GlossarioService]
})
export class GlossarioModule { }
