import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entidade } from './entidade.entity';
import { Repository } from 'typeorm';
import { EntidadesMetodosService } from './entidades-metodos/entidades-metodos.service';
import { EntidadeDTO } from './entidade.dto';
import { ValorEntidade } from './valor-entidade.entity';
import { SinonimoValorEntidade } from './sinonimo-valor-entidade.entity';

@Injectable()
export class EntidadesService {

  entidades: Entidade[] = [];

  constructor(
    @InjectRepository(Entidade) private readonly repository: Repository<Entidade>,
    @InjectRepository(ValorEntidade) private readonly valoresRepository: Repository<ValorEntidade>,
    @InjectRepository(SinonimoValorEntidade) private readonly sinonimosRepository: Repository<SinonimoValorEntidade>,
    private readonly entidadesMetodos: EntidadesMetodosService
  ){ }

  async carregarEntidades(entidades: Entidade[]){

    const entidadesCarregadas = await this.repository.findByIds(entidades);

    entidadesCarregadas.forEach(entidade => {
      if(entidade.ic_metodo)
        entidade.metodo = this.entidadesMetodos.findMetodo(entidade.nm_metodo).bind(this.entidadesMetodos);
    });

    this.entidades.push(...entidadesCarregadas);

    return entidadesCarregadas;
  }

  async buscarTodasEntidadesDoSistema(){

    return this.repository.find({
      ic_sistema: true
    });

  }

  async criarEntidade(entidade: EntidadeDTO){

    const novaEntidade = new Entidade();

    novaEntidade.nm_entidade = entidade.nm_entidade;
    novaEntidade.nm_metodo = entidade.nm_metodo;
    novaEntidade.ic_sistema = entidade.ic_sistema;
    novaEntidade.ic_proximidade = entidade.ic_proximidade;
    novaEntidade.ic_metodo = entidade.ic_metodo;

    const entidadeSaved = await this.repository.save(novaEntidade);

    for(const valor of entidade.valores){

      const novoValorEntidade = new ValorEntidade();

      novoValorEntidade.nm_valor = valor.nm_valor;
      novoValorEntidade.ic_expressao = valor.ic_expressao;
      novoValorEntidade.entidade = entidadeSaved;

      const valorSaved = await this.valoresRepository.save(novoValorEntidade);

      for(const sinonimo of valor.sinonimos){

        const novoSinonimo = new SinonimoValorEntidade();

        novoSinonimo.ds_valor_sinonimo = sinonimo;
        novoSinonimo.valorEntidade = valorSaved;

        await this.sinonimosRepository.save(novoSinonimo);

      }

    }
    
    return this.repository.findOne(entidadeSaved.id);

  }

  async removerEntidade(id: number){

    const entidade = await this.repository.findOne(id);

    const valoresEntidade = await this.valoresRepository.find({
      entidade
    });

    await this.valoresRepository.remove(valoresEntidade);

    return this.repository.remove(entidade);

  }

}
