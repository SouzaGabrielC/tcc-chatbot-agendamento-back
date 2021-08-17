import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bot } from './bot.entity';
import { DialogosModule } from '../dialogos/dialogos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bot]), DialogosModule],
  providers: [BotsService],
  exports: [BotsService]
})
export class BotsModule {}
