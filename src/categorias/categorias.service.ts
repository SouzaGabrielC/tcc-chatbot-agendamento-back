import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamesService } from '../exames/exames.service';
import { CategoriaDTO } from './categoria.dto';
import { SinonimoCategoria } from './sinonimo-categoria.entity';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(SinonimoCategoria) private readonly sinonimoRepository: Repository<SinonimoCategoria>, 
    private readonly examesService: ExamesService ){ }

  async novaCategoria(categoria: CategoriaDTO): Promise<Categoria>{

    const novaCategoria = new Categoria();

    const ultimaCategoria: number = parseInt(
      (await this.categoriaRepository.query('select max(id_categoria) as count from tb_categoria'))[0].count
    );

    novaCategoria.id_categoria = ultimaCategoria ? ultimaCategoria + 1 : 1;

    novaCategoria.nm_categoria = categoria.nm_categoria;

    const categoriaSaved = await this.categoriaRepository.save(novaCategoria);
    categoriaSaved.sinonimos = [];

    for(const sinonimo of categoria.sinonimos){
      const novoSinonimo = new SinonimoCategoria();
      novoSinonimo.nm_sinonimo_categoria = sinonimo;
      novoSinonimo.categoria = categoriaSaved;

      await this.sinonimoRepository.save(novoSinonimo);
    }


    return this.categoriaRepository.findOne(categoriaSaved.id_categoria);


  }

  async removerCategoria(id: number): Promise<Categoria>{
    
    const categoria = await this.buscarCategoria(id);

    await this.examesService.removerExames(categoria.exames);

    return this.categoriaRepository.remove(categoria);

  }

  async atualizarCategoria(id: number, categoriaNova: CategoriaDTO): Promise<Categoria>{

    const categoria = await this.buscarCategoria(id);

    if(categoriaNova.nm_categoria)
      categoria.nm_categoria = categoriaNova.nm_categoria;

    return this.categoriaRepository.save(categoria);

  }

  buscarCategoria(id): Promise<Categoria>{
    return this.categoriaRepository.findOne(id, {
      relations: ['exames']
    });
  }

  buscarTodasCategorias(): Promise<Categoria[]>{
    return this.categoriaRepository.find();
  }

  buscarTodasCategoriasComSinonimos(): Promise<Categoria[]>{
    return this.categoriaRepository.find({
      relations: ['sinonimos']
    });
  }

}
