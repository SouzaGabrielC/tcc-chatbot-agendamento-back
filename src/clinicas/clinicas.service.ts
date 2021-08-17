import { Injectable, Logger, NotFoundException, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clinica } from './clinica.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClinicasService {
  
  private logger: Logger;

  constructor(
    @InjectRepository(Clinica) private readonly clinicaRepository: Repository<Clinica>
  ) {

    this.logger = new Logger('ClinicasController');

  }

  async novaClinica(nm_clinica: string): Promise<Clinica> {

    const clinica: Clinica = new Clinica();
    const lastClinica: number = parseInt(
      (await this.clinicaRepository.query('select max(id_clinica) as count from tb_clinica'))[0].count
    );

    clinica.id_clinica = lastClinica ? lastClinica + 1 : 1;
    clinica.nm_clinica = nm_clinica;

    return this.clinicaRepository.save(clinica);

  }

  async removerClinica(id_clinica: number): Promise<Clinica> {

    try {

      return this.clinicaRepository.remove(
        await this.clinicaRepository.findOneOrFail(id_clinica),
      );

    } catch (err) {

      this.logger.error(err);

      if (err.name && err.name === 'EntityNotFound')
        throw new NotFoundException("Nenhuma clinica encontrada com o id passado");

      throw new HttpException("Houve algum problema ao realizar esta ação", 500);
    }

  }

  async atualizarClinica(id_clinica: number, nm_clinica: string): Promise<Clinica> {

    try {

      const clinica = await this.clinicaRepository.findOneOrFail(id_clinica);

      clinica.nm_clinica = nm_clinica ? nm_clinica : clinica.nm_clinica; 

      return this.clinicaRepository.save(clinica);

    } catch (err) {

      this.logger.error(err);

      if (err.name && err.name === 'EntityNotFound')
        throw new NotFoundException("Nenhuma clinica encontrada com o id passado");

      throw new HttpException("Houve algum problema ao realizar esta ação", 500);
    }

  }

  buscarTodasClinicas(): Promise<Clinica[]> {

    return this.clinicaRepository.find();

  }

  buscarClinica(id_clinica): Promise<Clinica> {

    try {

      return this.clinicaRepository.findOneOrFail(id_clinica);

    } catch (err) {
      this.logger.error(err);

      if (err.name && err.name === 'EntityNotFound')
        throw new NotFoundException("Nenhuma clinica encontrada com o id passado");

      throw new HttpException("Houve algum problema ao realizar esta ação", 500);
    }


  }

  buscarClinicaComTodasUnidades(id_clinica){

    try {

      return this.clinicaRepository.findOneOrFail(id_clinica,
        {
          relations: ['unidades']
        });

    } catch (err) {
      this.logger.error(err);

      if (err.name && err.name === 'EntityNotFound')
        throw new NotFoundException("Nenhuma clinica encontrada com o id passado");

      throw new HttpException("Houve algum problema ao realizar esta ação", 500);
    }

  }


}
