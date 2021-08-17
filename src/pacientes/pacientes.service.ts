import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Paciente } from './paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PacientesService extends TypeOrmCrudService<Paciente>{
  constructor(@InjectRepository(Paciente) private readonly repository: Repository<Paciente>){
    super(repository);
  }

  buscarTodos(){
    return this.repository.find({
      relations: ['estado', 'clinica']
    });
  }

  buscarPaciente(id_clinica: number, id_paciente: number){
    return this.repository.findOneOrFail({
      id: id_paciente,
      id_clinica
    }, {
      relations: ['estado', 'clinica']
    });
  }

  buscarTodosClinica(id_clinica: number){
    return this.repository.find({
      where: {
        clinica:{
          id_clinica
        }
      },
      relations: ['estado', 'clinica']
    });
  }

  buscarPacientePorCPF(id_clinica, cd_cpf){
    return this.repository.findOne({
      where: {
        id_clinica,
        cd_cpf
      },
      relations: ['estado', 'clinica']
    });
  }

  cadastrarPacienteByChat(id_clinica, cd_cpf, nm_paciente, ds_email): Promise<Paciente>{

    const paciente = new Paciente();

    paciente.id_clinica = id_clinica;
    paciente.nm_paciente = nm_paciente;
    paciente.cd_cpf = cd_cpf;
    paciente.ds_email = ds_email;

    return this.repository.save(paciente);
  }
}
