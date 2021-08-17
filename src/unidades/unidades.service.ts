import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { Unidade } from './unidade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadeDTO } from './unidade.dto';
import { Clinica } from '../clinicas/clinica.entity';
import { Medico } from '../medicos/medico.entity';
import { Agenda } from '../agendas/agenda.entity';
import { Consulta } from '../consultas/consulta.entity';
import { ExameUnidade } from './exames-unidade/exame-unidade.entity';

@Injectable()
export class UnidadesService {

  constructor(
    @InjectRepository(Unidade) private readonly unidadeRepository: Repository<Unidade>,
    @InjectRepository(Clinica) private readonly clinicaRepository: Repository<Clinica>,
    @InjectRepository(Medico) private readonly medicoRepository: Repository<Medico>
    ){ }

  async getUnidades(): Promise<Unidade[]>{
    return this.unidadeRepository.find();
  }

  async getUnidade(id_unidade: number): Promise<Unidade>{
    try {

      return this.unidadeRepository.findOneOrFail(id_unidade);

    } catch (err) {

      if (err.name && err.name === 'EntityNotFound')
        throw new NotFoundException("Nenhuma unidade encontrada com o id passado");

      throw new HttpException("Houve algum problema ao realizar esta ação", 500);
    }
  }

  async novaUnidade(unidade: UnidadeDTO): Promise<Unidade>{

    const novaUnidade: Unidade = new Unidade();

    if(unidade.id_clinica){

      try {

        const clinica = await this.clinicaRepository.findOneOrFail(unidade.id_clinica);

        novaUnidade.clinica = clinica;
        novaUnidade.cd_cep = unidade.cd_cep;
        novaUnidade.cd_cnpj = unidade.cd_cnpj;
        novaUnidade.cd_numero = unidade.cd_numero;
        novaUnidade.ds_complemento = unidade.ds_complemento;
        novaUnidade.nm_bairro = unidade.nm_bairro;
        novaUnidade.nm_cidade = unidade.nm_cidade;
        novaUnidade.nm_estado = unidade.nm_estado;
        novaUnidade.nm_rua = unidade.nm_rua;
        novaUnidade.nm_unidade = unidade.nm_unidade;
        novaUnidade.ic_matriz = unidade.ic_matriz;

        const lastUnidade: number = parseInt(
          (await this.unidadeRepository.query(`select ifnull((select max(u.id_unidade) from tb_unidade as u), 0)+ 1 as count`))[0].count
        );

        novaUnidade.id_unidade = lastUnidade;

        return this.unidadeRepository.save(novaUnidade);
      
      } catch (error) {

        throw new HttpException("Erro ao criar unidade! Unidade precisa de um clinica válida.", 500);  
      
      }

    } else {

      throw new HttpException("Erro ao criar unidade! Unidade precisa de um clinica para vincular.", 500);
    
    }

  }

  async removeUnidade(id_unidade: number): Promise<Unidade>{

    try {

      return this.unidadeRepository.remove(
        await this.unidadeRepository.findOneOrFail(id_unidade)
      );

    } catch (err) {

      if (err.name && err.name === 'EntityNotFound')
        throw new NotFoundException("Nenhuma unidade encontrada com o id passado");

      throw new HttpException("Houve algum problema ao realizar esta ação", 500);
    }

  }

  async removeUnidades(unidades: Array<Unidade>): Promise<Unidade[]>{

    try {

      if(unidades){
        
        return this.unidadeRepository.remove(unidades);
        
      }

    } catch (err) {

      if (err.name && err.name === 'EntityNotFound')
        throw new NotFoundException("Nenhuma unidade encontrada com o id passado");

      throw new HttpException("Houve algum problema ao realizar esta ação", 500);
    }

  }

  async atualizarUnidade(id_unidade: number, unidadeInfos: UnidadeDTO): Promise<Unidade>{

    try {

      const unidade = await this.unidadeRepository.findOneOrFail(id_unidade);

      unidade.cd_cep = unidadeInfos.cd_cep ? unidadeInfos.cd_cep : unidade.cd_cep;
      unidade.cd_cnpj = unidadeInfos.cd_cnpj ? unidadeInfos.cd_cnpj : unidade.cd_cnpj;
      unidade.cd_numero = unidadeInfos.cd_numero ? unidadeInfos.cd_numero : unidade.cd_numero;
      unidade.ds_complemento = unidadeInfos.ds_complemento ? unidadeInfos.ds_complemento : unidade.ds_complemento;
      unidade.nm_bairro = unidadeInfos.nm_bairro ? unidadeInfos.nm_bairro : unidade.nm_bairro;
      unidade.nm_cidade = unidadeInfos.nm_cidade ? unidadeInfos.nm_cidade : unidade.nm_cidade;
      unidade.nm_estado = unidadeInfos.nm_estado ? unidadeInfos.nm_estado : unidade.nm_estado;
      unidade.nm_rua = unidadeInfos.nm_rua ? unidadeInfos.nm_rua : unidade.nm_rua;
      unidade.nm_unidade = unidadeInfos.nm_unidade ? unidadeInfos.nm_unidade : unidade.nm_unidade;
      unidade.ic_matriz = unidadeInfos.ic_matriz ? unidadeInfos.ic_matriz : unidade.ic_matriz;

      if(unidadeInfos.id_clinica){

        try {
          
          const clinica = await this.clinicaRepository.findOneOrFail(unidadeInfos.id_clinica);
          unidade.clinica = clinica;

        } catch (error) {
          // todo logger
        }

      }

      return this.unidadeRepository.save(unidade);

    } catch (err) {

      if (err.name && err.name === 'EntityNotFound')
        throw new NotFoundException("Nenhuma unidade encontrada com o id passado");

      throw new HttpException("Houve algum problema ao realizar esta ação", 500);
    }

  }

  buscarMedicosUnidade(id_unidade: number){
    return this.unidadeRepository.findOneOrFail(id_unidade, {
      relations: ['medicos']
    });
  }

  async adicionarMedicoUnidade(id_unidade: number, id_medico: number){

    try {
      
      const medico = await this.medicoRepository.findOneOrFail(id_medico);

      const unidade = await this.unidadeRepository.findOneOrFail(id_unidade, {
        relations: ['medicos']
      });

      unidade.medicos.push(medico);

      return this.unidadeRepository.save(unidade);

    } catch (error) {
      throw new HttpException("Houve um problema na requisição", 500);
      
    }
  
  }

  async removerMedicoUnidade(id_unidade: number, id_medico: number){

    try {

      const unidade = await this.unidadeRepository.findOneOrFail(id_unidade, {
        relations: ['medicos']
      });
  
      unidade.medicos.splice(unidade.medicos.findIndex(medico => medico.id_medico === id_medico), 1);
  
      return this.unidadeRepository.save(unidade);
      
    } catch (error) {
      throw new HttpException("Houve um problema na requisição", 500);
    }

  }

}
