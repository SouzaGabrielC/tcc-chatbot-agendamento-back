import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  MetodoParams,
  MetodoReturn,
  MetodoValores,
} from './entidade-metodo-interfaces';
import { ConveniosService } from '../../../convenios/convenios.service';
import { CategoriasService } from '../../../categorias/categorias.service';
import { ClinicasService } from '../../../clinicas/clinicas.service';
import { ExamesUnidadeService } from '../../../unidades/exames-unidade/exames-unidade.service';
import { ExameUnidade } from '../../../unidades/exames-unidade/exame-unidade.entity';
import { ModuleRef } from '@nestjs/core';
import { UnidadesService } from '../../../unidades/unidades.service';
import { Convenio } from '../../../convenios/convenio.entity';

@Injectable()
export class EntidadesMetodosService implements OnModuleInit {
  private conveniosService: ConveniosService;
  private categoriasService: CategoriasService;
  private clinicasService: ClinicasService;
  private examesUnidadeService: ExamesUnidadeService;
  private unidadeService: UnidadesService;

  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    this.clinicasService = this.moduleRef.get(ClinicasService, {
      strict: false,
    });
    this.categoriasService = this.moduleRef.get(CategoriasService, {
      strict: false,
    });
    this.examesUnidadeService = this.moduleRef.get(ExamesUnidadeService, {
      strict: false,
    });
    this.conveniosService = this.moduleRef.get(ConveniosService, {
      strict: false,
    });
    this.unidadeService = this.moduleRef.get(UnidadesService, {
      strict: false,
    });
  }

  findMetodo(nome: string): Function {
    return this[nome] && typeof this[nome] === 'function' ? this[nome] : null;
  }

  async buscaConvenios(param: MetodoParams): Promise<MetodoReturn> {

    const exameMemoria = param.memorias.find(
      memoria => memoria.nome === '$exame'
    );

    const clinicaMemoria = param.memorias.find(
      memoria => memoria.nome === '$clinica',
    );

    const unidadeMemoria = param.memorias.find(
      memoria => memoria.nome === '$unidade',
    );

    console.log("Entidade convenio", exameMemoria, unidadeMemoria, clinicaMemoria);

    let convenios: Convenio[] = [];

    if(unidadeMemoria){

      if(exameMemoria){
        convenios = await this.examesUnidadeService.buscarConveniosExameUnidade(unidadeMemoria.valor, exameMemoria.valor);
      }else{
        convenios = await this.examesUnidadeService.buscarConveniosUnidade(unidadeMemoria.valor);
      }

    }else{

      const clinica = await this.clinicasService.buscarClinicaComTodasUnidades(clinicaMemoria.valor);

      const unidadesId = clinica.unidades.map(unidade => unidade.id_unidade);

      for(const unidadeId of unidadesId){
        
        if(exameMemoria){
          convenios.push(...(await this.examesUnidadeService.buscarConveniosExameUnidade(unidadeId, exameMemoria.valor)));  
        }else{
          convenios.push(...(await this.examesUnidadeService.buscarConveniosUnidade(unidadeId)));
        }

      }

      for(let i = 0; i < convenios.length; i++){

        for(let j = i+1; j < convenios.length; j++){
          
          if(convenios[i].id_convenio === convenios[j].id_convenio){
            convenios.splice(j, 1);
          }
  
        }
  
      }

    }


    const conveniosEntidade = convenios.map<MetodoValores>(convenio => ({
      nm_valor: convenio.nm_convenio,
      sinonimos: convenio.sinonimos.map(sinonimo => ({ds_valor_sinonimo: sinonimo.nm_sinonimo_convenio})),
      valorId: convenio.id_convenio,
    }));

    console.log("Convenios Map:", conveniosEntidade)
    return {
      valores: conveniosEntidade,
    };

  }

  async buscaExames(param: MetodoParams): Promise<MetodoReturn> {

    const clinicaMemoria = param.memorias.find(
      memoria => memoria.nome === '$clinica',
    );

    const unidadeMemoria = param.memorias.find(
      memoria => memoria.nome === '$unidade',
    );

    const categoriaMemoria = param.memorias.find(
      memoria => memoria.nome === '$categoria',
    );

    const examesUnidade: ExameUnidade[] = [];

    if (unidadeMemoria) {

      let examesUnidadeRetorno = null;

      if(categoriaMemoria)
        examesUnidadeRetorno = await this.examesUnidadeService.buscarTodosExamesUnidade(
          unidadeMemoria.valor,
          categoriaMemoria.valor
        );
      else
        examesUnidadeRetorno = await this.examesUnidadeService.buscarTodosExamesUnidade(
          unidadeMemoria.valor,
        );

      examesUnidade.push(
        ...examesUnidadeRetorno,
      );

    } else {
      
      const clinica = await this.clinicasService.buscarClinicaComTodasUnidades(
        clinicaMemoria.valor,
      );
  
      for (const unidade of clinica.unidades) {

        let examesUnidadeRetorno = null;

        if(categoriaMemoria)
          examesUnidadeRetorno = await this.examesUnidadeService.buscarTodosExamesUnidade(
            unidade.id_unidade,
            categoriaMemoria.valor
          );
        else
          examesUnidadeRetorno = await this.examesUnidadeService.buscarTodosExamesUnidade(
            unidade.id_unidade,
          );

        examesUnidade.push(
          ...examesUnidadeRetorno
        );
      }

    }

    return {
      valores: examesUnidade.map<MetodoValores>(exameUnidade => ({
        nm_valor: exameUnidade.exame.nm_exame,
        sinonimos: [],
        valorId: exameUnidade.exame.id_exame,
      })),
    };
  }

  async buscaCategoriasExames(param: MetodoParams): Promise<MetodoReturn> {
    const categorias = await this.categoriasService.buscarTodasCategoriasComSinonimos();

    return {
      valores: categorias.map<MetodoValores>(categoria => ({
        nm_valor: categoria.nm_categoria,
        sinonimos: categoria.sinonimos.map(sinonimo => ({
          ds_valor_sinonimo: sinonimo.nm_sinonimo_categoria,
        })),
        valorId: categoria.id_categoria,
      })),
    };
  }
}
