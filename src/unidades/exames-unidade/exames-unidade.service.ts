import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExameUnidade } from './exame-unidade.entity';
import { Repository } from 'typeorm';
import { ExameUnidadeDTO } from './exame-unidade.dto';
import { Unidade } from '../unidade.entity';
import { Exame } from '../../exames/exame.entity';

import * as _ from "underscore";
import { Convenio } from '../../convenios/convenio.entity';

@Injectable()
export class ExamesUnidadeService {

  constructor(
    @InjectRepository(ExameUnidade) private readonly examesUnidadeRepository: Repository<ExameUnidade>,
    @InjectRepository(Unidade) private readonly unidadeRepository: Repository<Unidade>,
    @InjectRepository(Exame) private readonly exameRepository: Repository<Exame>
  ){ }

  async novoExameUnidade(id_unidade: number, exameUnidade: ExameUnidadeDTO){

    const novoExameUnidade = new ExameUnidade();

    const unidade = await this.unidadeRepository.findOneOrFail(id_unidade);

    const exame = await this.exameRepository.findOneOrFail(exameUnidade.id_exame);

    novoExameUnidade.exame = exame;
    novoExameUnidade.unidade = unidade;
    novoExameUnidade.ds_exame = exameUnidade.ds_exame;
    novoExameUnidade.ds_observacao = exameUnidade.ds_observacao;
    novoExameUnidade.ds_preparo = exameUnidade.ds_preparo;
    novoExameUnidade.vl_exame = exameUnidade.vl_exame;
    novoExameUnidade.tm_retirada = exameUnidade.tm_retirada;
    novoExameUnidade.ic_retirada_pos_exame = exameUnidade.ic_retirada_pos_exame;

    return this.examesUnidadeRepository.save(novoExameUnidade);

  }

  async buscarTodosExamesUnidade(id_unidade: number, id_categoria?: number){

    if(id_categoria){
      return this.examesUnidadeRepository.find({
        where: {
          unidade: await this.unidadeRepository.findOne(id_unidade),
          "exame.categoria.id_categoria" : id_categoria
        },
        relations: ['exame', 'exame.categoria']
      });
    }

    return this.examesUnidadeRepository.find({
      where: {
        unidade: await this.unidadeRepository.findOne(id_unidade)
      },
      relations: ['exame']
    });

  }

  async buscarExameUnidade(id_unidade: number, id_exame: number){

    return this.examesUnidadeRepository.findOne({
      where: {
        unidade: await this.unidadeRepository.findOne(id_unidade),
        exame: await this.exameRepository.findOne(id_exame)
      },
      relations: ['exame']
    });

  }

  async buscarExameUnidadeComTodasInfos(id_unidade: number, id_exame: number){
    return this.examesUnidadeRepository.findOne({
      where: {
        unidade: await this.unidadeRepository.findOne(id_unidade),
        exame: await this.exameRepository.findOne(id_exame)
      },
      relations: ['exame', 'unidade']
    });
  }

  async removerExameUnidade(id_unidade: number, id_exame: number){

    return this.examesUnidadeRepository.remove(
      await this.buscarExameUnidadeComTodasInfos(id_unidade, id_exame)
    );

  }

  async atualizarExameUnidade(id_unidade: number, id_exame: number, exameUnidadeNovo: ExameUnidadeDTO){

    const exameUnidade = await this.buscarExameUnidadeComTodasInfos(id_unidade, id_exame);

    exameUnidade.ds_exame = exameUnidadeNovo.ds_exame || exameUnidade.ds_exame;
    exameUnidade.ds_observacao = exameUnidadeNovo.ds_observacao || exameUnidade.ds_observacao;
    exameUnidade.ds_preparo = exameUnidadeNovo.ds_preparo || exameUnidade.ds_preparo;
    exameUnidade.ic_retirada_pos_exame = exameUnidadeNovo.ic_retirada_pos_exame === false || exameUnidadeNovo.ic_retirada_pos_exame ? exameUnidadeNovo.ic_retirada_pos_exame : exameUnidade.ic_retirada_pos_exame;
    exameUnidade.tm_retirada = exameUnidadeNovo.tm_retirada || exameUnidade.tm_retirada;
    exameUnidade.vl_exame = exameUnidadeNovo.vl_exame || exameUnidade.vl_exame;

    return this.examesUnidadeRepository.save(exameUnidade);

  }

  async buscarConveniosExameUnidade(id_unidade: number, id_exame: number){

    const exameUnidade = await this.examesUnidadeRepository.findOne({
      where: { 
        id_exame,
        id_unidade
      },
      relations: ['convenios']
    });

    return exameUnidade ? exameUnidade.convenios : [];

  }

  async buscarConveniosUnidade(id_unidade: number){

    const exames = await this.examesUnidadeRepository.find({
      where: { 
        id_unidade
      },
      relations: ['convenios']
    });

    let convenios = exames.map(exame => exame.convenios);

    let conveniosFlat: Convenio[] = _.flatten(convenios, true);

    for(let i = 0; i < conveniosFlat.length; i++){

      for(let j = i+1; j < conveniosFlat.length; j++){
        
        if(conveniosFlat[i].id_convenio === conveniosFlat[j].id_convenio){
          conveniosFlat.splice(j, 1);
        }

      }

    }

    return conveniosFlat;

  }

  async buscarTodosExamesUnidadesDoExame(id_exame: number){

    return this.examesUnidadeRepository.find({
      where: {
        id_exame
      },
      relations: ['unidade']
    });

  }

  async buscarAgendasExameUnidade(id_exame: number, id_unidade: number){

    return this.examesUnidadeRepository.findOne({
      where: {
        id_exame,
        id_unidade
      },
      relations: ['agendas']
    });

  }


}
