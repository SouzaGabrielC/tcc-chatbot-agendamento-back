import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicoDTO } from './medico.dto';
import { Agenda } from '../agendas/agenda.entity';

@Injectable()
export class MedicosService {

  constructor(@InjectRepository(Medico) private readonly medicosRepository: Repository<Medico>){ }

  buscarTodosMedicos(){
    return this.medicosRepository.find();
  }

  buscarMedico(id: number){
    return this.medicosRepository.findOne(id);
  }

  async novoMedico(medico: MedicoDTO){

    const novoMedico = new Medico();

    novoMedico.nm_medico = medico.nm_medico;
    novoMedico.ds_sexo = medico.ds_sexo;
    novoMedico.cd_telefone = medico.cd_telefone;
    novoMedico.cd_crm = medico.cd_crm;

    const ultimoMedico: number = parseInt(
      (await this.medicosRepository.query('select max(id_medico) as count from tb_medico'))[0].count
    );

    novoMedico.id_medico = ultimoMedico ? ultimoMedico + 1 : 1;


    return this.medicosRepository.save(novoMedico);

  }

  async removerMedico(id: number){
    return this.medicosRepository.remove(await this.buscarMedico(id));
  }

  async atualizarMedico(id: number, medicoNovo: MedicoDTO){

    const medico = await this.buscarMedico(id);

    medico.nm_medico = medicoNovo.nm_medico || medico.nm_medico;
    medico.ds_sexo = medicoNovo.ds_sexo || medico.ds_sexo;
    medico.cd_telefone = medicoNovo.cd_telefone || medico.cd_telefone;
    medico.cd_crm = medicoNovo.cd_crm || medico.cd_crm;

    return this.medicosRepository.save(medico);

  }

  async agendasMedico(id_medico: number): Promise<Agenda[]>{

    const medico = await this.medicosRepository.findOne(id_medico, {
      relations: ['agendas']
    });

    return medico.agendas;

  }

}
