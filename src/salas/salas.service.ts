import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sala } from './sala.entity';
import { Repository } from 'typeorm';
import { Clinica } from '../clinicas/clinica.entity';
import { Mensagem } from './mensagens/mensagem.entity';

@Injectable()
export class SalasService {

  constructor(
    @InjectRepository(Sala) private readonly repository: Repository<Sala>,
    @InjectRepository(Mensagem) private readonly mensagemRepository: Repository<Mensagem>
  ){ }

  criarSala(clinica: Clinica): Promise<Sala>{
   
    const novaSala = new Sala();
    novaSala.clinica = clinica;
    novaSala.dt_hr_inicio = new Date();
    
    return this.repository.save(novaSala);

  }

  async finalizarSala(sala: Sala, mensagens: Mensagem[]){

    await this.mensagemRepository.save(mensagens);

    sala.dt_hr_fim = new Date();

    await this.repository.save(sala);

  }

}
