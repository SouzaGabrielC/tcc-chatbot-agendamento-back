import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService extends TypeOrmCrudService<Status>{

  constructor(@InjectRepository(Status) private readonly repository: Repository<Status>){
    super(repository);
  }

}
