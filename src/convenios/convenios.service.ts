import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Convenio } from './convenio.entity';
import { Repository } from 'typeorm';
import { ConvenioDTO } from './convenio.dto';
import { SinonimoConvenio } from './sinonimo-convenio.entity';

@Injectable()
export class ConveniosService {

  constructor(
    @InjectRepository(Convenio) private readonly convenioRepository: Repository<Convenio>,
    @InjectRepository(SinonimoConvenio) private readonly sinonimoRepository: Repository<SinonimoConvenio>
  ){ }

  buscarConvenio(id: number){
    return this.convenioRepository.findOne(id);
  }

  buscarTodosConvenios(){
    return this.convenioRepository.find();
  }

  async novoConvenio(convenio: ConvenioDTO){

    const novoConvenio = new Convenio();

    novoConvenio.nm_convenio = convenio.nm_convenio;
    novoConvenio.ds_email = convenio.ds_email;
    novoConvenio.cd_telefone = convenio.cd_telefone;
    novoConvenio.cd_cnpj = convenio.cd_cnpj;

    const ultimoConvenio: number = parseInt(
      (await this.convenioRepository.query('select max(id_convenio) as count from tb_convenio'))[0].count
    );

    novoConvenio.id_convenio = ultimoConvenio ? ultimoConvenio + 1 : 1;

    const convenioSaved = await this.convenioRepository.save(novoConvenio);

    for(const sinonimo of convenio.sinonimos){
      const novoSinonimo = new SinonimoConvenio();
      novoSinonimo.nm_sinonimo_convenio = sinonimo;
      novoSinonimo.convenio = convenioSaved;

      await this.sinonimoRepository.save(novoSinonimo);
    }


    return this.convenioRepository.findOne(convenioSaved.id_convenio);

  }

  async removerConvenio(id: number){
    console.log("ID:", id);
    const convenio = await this.buscarConvenio(id);
    console.log(convenio);
    return this.convenioRepository.remove(convenio);
  }

  async atualizarConvenio(id: number, convenioNovo: ConvenioDTO){

    const convenio = await this.buscarConvenio(id);

    convenio.nm_convenio = convenioNovo.nm_convenio || convenio.nm_convenio;
    convenio.ds_email = convenioNovo.ds_email || convenio.ds_email;
    convenio.cd_telefone = convenioNovo.cd_telefone || convenio.cd_telefone;
    convenio.cd_cnpj = convenioNovo.cd_cnpj || convenio.cd_cnpj;

    return this.convenioRepository.save(convenio);

  }

}
