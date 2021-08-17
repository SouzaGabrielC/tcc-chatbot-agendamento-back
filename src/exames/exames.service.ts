import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exame } from './exame.entity';
import { Repository } from 'typeorm';
import { ExameDTO } from './exame.dto';
import { Categoria } from '../categorias/categoria.entity';
import { SinonimoExame } from './sinonimo-exame.entity';

@Injectable()
export class ExamesService {

  constructor(
    @InjectRepository(Exame) private readonly exameRepository: Repository<Exame>,
    @InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(SinonimoExame) private readonly sinonimoRepository: Repository<SinonimoExame> 
  ){ }


  buscarExame(id: number){
    return this.exameRepository.findOne(id);
  }

  buscarTodosExames(){
    return this.exameRepository.find();
  }

  buscarTodosExamesCategoria(id_categoria: number){
    return this.exameRepository.find({
      where: {
        categoria: {
          id_categoria
        }
      }
    });
  }

  async novoExame(exame: ExameDTO){
    
    const novoExame = new Exame();

    novoExame.nm_exame = exame.nm_exame;
    novoExame.categoria = await this.categoriaRepository.findOne(exame.id_categoria);
    
    const ultimoExame: number = parseInt(
      (await this.exameRepository.query('select max(id_exame) as count from tb_exame'))[0].count
    );

    novoExame.id_exame = ultimoExame ? ultimoExame + 1 : 1;

    const exameSaved = await this.exameRepository.save(novoExame);

    for(const sinonimo of exame.sinonimos){
      const novoSinonimo = new SinonimoExame();
      novoSinonimo.nm_sinonimo_exame = sinonimo;
      novoSinonimo.exame = exameSaved;

      await this.sinonimoRepository.save(novoSinonimo);
    }


    return this.exameRepository.findOne(exameSaved.id_exame);
  }

  async atualizarExame(id: number, exameNovo: ExameDTO){

    const exame = await this.buscarExame(id);

    exame.nm_exame = exameNovo.nm_exame || exame.nm_exame;
    
    if(exameNovo.id_categoria)
      exame.categoria = await this.categoriaRepository.findOne(exameNovo.id_categoria);
    
    return this.exameRepository.save(exame);

  }

  async removerExame(id: number){
    return this.exameRepository.remove(await this.buscarExame(id));
  }

  removerExames(exames: Exame[]): Promise<Exame[]>{

    return this.exameRepository.remove(exames);

  }

}
