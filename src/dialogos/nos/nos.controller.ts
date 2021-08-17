import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { No } from './no.entity';
import { Repository, IsNull } from 'typeorm';

@Controller('nos')
export class NosController {

  constructor(@InjectRepository(No) private readonly repo: Repository<No>){

  }


}
