import { MemoriaIdentidade, MemoriaInformativa } from "./Memoria";
import { Bot } from "../../bots/bot.entity";
import { Dialogo } from "../../dialogos/dialogo.entity";
import { No } from "../../dialogos/nos/no.entity";

export class BotAtendente{

  private _iniciado;
  private _dialogo: Dialogo;
  private ultimoNoExecutado: No;
  
  memoriasIdentidade: MemoriaIdentidade<any>[];
  memoriasInformativa: MemoriaInformativa[];
  nome: string;

  constructor(bot: Bot){

    this.nome = bot.nm_bot;
    this._iniciado = false;
    this._dialogo = bot.dialogo;
    this.ultimoNoExecutado = null;
    this.memoriasIdentidade = [];
    this.memoriasInformativa = [];

    this.memoriasIdentidade.push(new MemoriaIdentidade('$clinica', bot.clinica.id_clinica));
    this.memoriasInformativa.push(new MemoriaInformativa('&clinica', bot.clinica.nm_clinica));
    this.memoriasInformativa.push(new MemoriaInformativa('&bot_nome', bot.nm_bot));    

  }

  async responder(texto: string): Promise<{
    texto: string, opcoes: {ds_opcao: string; vl_opcao: string}[]
  }>{

    const dialogoRetorno = await this._dialogo.service.classificacao(texto,this._dialogo, this._iniciado, this.memoriasIdentidade, this.memoriasInformativa, this.ultimoNoExecutado);

    this.memoriasIdentidade = dialogoRetorno.memoriasIdentidade;
    this.memoriasInformativa = dialogoRetorno.memoriasInformativa;

    this._iniciado = dialogoRetorno.iniciado;

    this.ultimoNoExecutado = dialogoRetorno.lastNoExecutado;

    return { texto: dialogoRetorno.resposta, opcoes: dialogoRetorno.opcoes};
  }

}