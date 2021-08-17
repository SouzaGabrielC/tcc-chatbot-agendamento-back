
export class MensagemIO{

  private _id: number;
  public texto: string;
  public opcoes: {
    ds_opcao: string;
    vl_opcao: string;
  }[];
  public data: Date;
  public visualizada: boolean;
  public fromBot: boolean;
  public fromUser: boolean;
  public fromAtendente: boolean;

  constructor(id: number, texto: string, opcoes, fromBot:boolean, fromUser: boolean, fromAtendente: boolean, visualizada?: boolean){

    this._id = id;
    this.texto = texto;
    this.fromBot = fromBot;
    this.fromAtendente = fromAtendente;
    this.fromUser = fromUser;
    this.data = new Date();
    this.visualizada = !!visualizada;
    this.opcoes = opcoes;

  }

  get id(){
    return this._id;
  }

  setVisualizada(){
    this.visualizada = true;
  }


}