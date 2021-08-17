import { Injectable } from '@nestjs/common';

import { LogisticRegressionClassifier, PorterStemmerPt, AggressiveTokenizerPt, LevenshteinDistance } from "natural";
import { Intencao } from '../intencoes/intecao.entity';
import { Entidade } from '../entidades/entidade.entity';
import { Classificacao } from './classificacao.interface';
import { MemoriaIdentidade } from '../../chat-io/classes/Memoria';
import { MetodoReturn, MetodoValores } from '../entidades/entidades-metodos/entidade-metodo-interfaces';
import { ValorEntidade } from '../../dialogos/entidades/valor-entidade.entity';

@Injectable()
export class ClassificadorService {


  criarClassificador(intencoes: Intencao[]): LogisticRegressionClassifier {

    const classificador = new LogisticRegressionClassifier(PorterStemmerPt);

    this.treinarClassificador(classificador, intencoes);

    return classificador;

  }

  treinarClassificador(classificador: LogisticRegressionClassifier, intencoes: Intencao[]) {

    try {

      for (const intencao of intencoes) {
        for (const pergunta of intencao.perguntas) {
          classificador.addDocument(pergunta.ds_pergunta, intencao.nm_intencao);
        }
      }

      classificador.train();

    } catch (ex) {
      console.error(ex);
      throw new Error("Erro ao treinar classificador");
    }

  }

  async verificarEntidades(frase: string, entidades: Entidade[], memoriasIdentidade: MemoriaIdentidade<any>[]): Promise<Array<{ entidade: string, valor: string, valorId: any }>> {

    const retorno = new Array<{ entidade: string, valor: string, valorId: any }>();

    const tokenizer = new AggressiveTokenizerPt();  
    console.log(`frase: ${frase}`)
    const palavras = tokenizer.tokenize(frase.toLowerCase());

    for (const entidade of entidades) {

      let distance = 0;

      if(entidade.ic_proximidade)
        distance = 1;

      let valores: ValorEntidade[] | MetodoValores[] = entidade.valores;

      if (entidade.ic_metodo && entidade.metodo) {

        let entidadeMetodo: MetodoReturn = await entidade.metodo({ memorias: memoriasIdentidade });
        valores = entidadeMetodo.valores;

      }

      for (const valor of valores) {

        if((<ValorEntidade>valor).ic_expressao){
   
          const valorExpressao = new RegExp(valor.nm_valor, "gmi");

          let matched, valores = [];

          while(matched = valorExpressao.exec(frase)){
            valores.push(matched[0]);
          }


          for(let valor of valores){
            retorno.push({
              entidade: entidade.nm_entidade,
              valor: valor,
              valorId: valor
            });
          }
          
          if(valor.sinonimos.length > 0){

            for(const sinonimo of valor.sinonimos){

              const valorExpressao = new RegExp(sinonimo.ds_valor_sinonimo, "gmi");
  
              let matched, valores = [];
  
              while(matched = valorExpressao.exec(frase)){
                valores.push(matched[0]);
              }
  
              for(let valor of valores){
                retorno.push({
                  entidade: entidade.nm_entidade,
                  valor: valor,
                  valorId: valor
                });
              }

            }

          }


        } else {

          const textoValor = valor.nm_valor.toLowerCase();
          const valorSplit = textoValor.split(" ");
          let matched = false;

          for (const index in palavras) {

            if (valorSplit.length > 1) {

              const palavraJoin = palavras.reduce(
                (prevValue, curValue, curIndex) => prevValue += curIndex >= parseInt(index) && curIndex < parseInt(index) + valorSplit.length ? `${curValue} ` : ''
                , ``);
                
            
              matched = LevenshteinDistance(textoValor, palavraJoin.trim()) <= distance;

            } else {

              matched = LevenshteinDistance(textoValor, palavras[index]) <= distance;

            }

            if (valor.sinonimos.length > 0 && !matched) {

              for (const sinonimo of valor.sinonimos) {

                const textoSinonimo = sinonimo.ds_valor_sinonimo.toLowerCase();
                const sinonimoSplit = textoSinonimo.split(" ");
                let sinonimoMatched = false;

                if (sinonimoSplit.length > 1) {

                  const palavraJoin = palavras.reduce(
                    (prevValue, curValue, curIndex) => prevValue += curIndex >= parseInt(index) && curIndex < parseInt(index) + sinonimoSplit.length ? `${curValue} ` : ''
                    , ``);

                  if (textoSinonimo === palavraJoin.trim()) {
                    sinonimoMatched = LevenshteinDistance(textoSinonimo, palavras[index]) <= distance;
                  }

                } else {
                  
                  if (textoSinonimo === palavras[index]) {
                    sinonimoMatched = LevenshteinDistance(textoSinonimo, palavras[index]) <= distance;
                  }

                }
                
                if (sinonimoMatched) {

                  matched = true;
                  break;

                }


              }

            }

            if (matched) {
              retorno.push({
                entidade: entidade.nm_entidade,
                valor: valor.nm_valor,
                valorId: (<MetodoValores>valor).valorId ? (<MetodoValores>valor).valorId : null
              });
            }

          }

        }

      }

    }


    return retorno;

  }

  async classificar(frase: string, classificador: LogisticRegressionClassifier, entidades: Entidade[], memoriasIdentidade: MemoriaIdentidade<any>[]): Promise<Classificacao> {

    let intencao = "";

    try {

      const classificado = classificador.getClassifications(frase).reduce((prev, value) => value.value > prev.value ? value : prev, { label: "", value: 0 });
      intencao = classificado.value >= 0.8 ? classificado.label : "";

    } catch (ex) {
      console.error("Erro na classificacao:" + ex);
    }

    const entidadesEncontradas = await this.verificarEntidades(frase, entidades, memoriasIdentidade);

    return {
      frase,
      intencao,
      entidades: entidadesEncontradas,
    }

  }

}
