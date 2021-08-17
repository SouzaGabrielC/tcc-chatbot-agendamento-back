import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from './estado.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class EstadosService extends TypeOrmCrudService<Estado>{

  constructor(@InjectRepository(Estado) private readonly repository: Repository<Estado>){
    super(repository);
  }

}
