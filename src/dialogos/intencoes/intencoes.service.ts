import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Intencao } from './intecao.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IntencoesService {

  intencoes: Intencao[] = [];

  constructor(@InjectRepository(Intencao) private readonly repositorio: Repository<Intencao>){}


  async carregarIntencoes(intencoes: Intencao[]): Promise<Intencao[]>{

    const intencoesBanco = await this.repositorio.findByIds(intencoes, {
      relations: ['perguntas']
    });

    this.intencoes.push(...intencoesBanco);

    return intencoesBanco;

  }


}
