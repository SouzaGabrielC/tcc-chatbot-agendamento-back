import { Clinica } from "../../clinicas/clinica.entity";
import { createHash } from "crypto";
import { Bot } from "../../bots/bot.entity";
import { SalaIO } from "../classes/SalaIO";

export class NamespaceClinica {

  private _id: string;
  private _clinica: Clinica;
  public salas: SalaIO[];
  public bot: Bot;

  constructor(clinica: Clinica){
    this._clinica = clinica;
    this.salas = new Array<SalaIO>();
    this._id = createHash("md5").update(this._clinica.id_clinica.toString()).digest("hex");
  }

  get id(){
    return this._id;
  }

  get clinica(){
    return this._clinica;
  }

}