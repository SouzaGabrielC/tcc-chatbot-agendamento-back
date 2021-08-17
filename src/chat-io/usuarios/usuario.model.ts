import { Socket } from "socket.io";
import { Subject } from "rxjs";
import { Mensagem } from "../../salas/mensagens/mensagem.entity";
import { MensagemIO } from "../classes/MensagemIO";

export class Usuario{

  private _socket: Socket;

  public onMensagem: Subject<Mensagem>;
  public onDisconnect: Subject<string>;
  public onTerminarChat: Subject<string>;
  public onMensagemVisualizada: Subject<number>;

  constructor(socket: Socket){
    
    this._socket = socket;

    this.onMensagem = new Subject<Mensagem>();
    this.onDisconnect = new Subject<string>();
    this.onTerminarChat = new Subject<string>();
    this.onMensagemVisualizada = new Subject<number>();

    this._socket.on("mensagem", (mensagemTexto: string) => {
      this.mensagem(mensagemTexto);
    });
  
    this._socket.on("mensagem-visualizada", (mensagemId) => {
      this.onMensagemVisualizada.next(mensagemId);
    });

    this._socket.on("disconnect", () => {
      this.onDisconnect.next(this.id);
    });

    this._socket.on("terminar-chat", () => {
      this.onTerminarChat.next(this.id);
    });

  }

  get id(){
    return this._socket.id;
  }

  public enviarMensagemParaUsuario(mensagem: MensagemIO){

      this._socket.emit("mensagem", mensagem);
      
  }

  private mensagem(mensagemTexto: string){
    
    const mensagem: Mensagem = new Mensagem(mensagemTexto, null, false, true, false);
    
    this.onMensagem.next(mensagem);

  }

  public mensagemVisualizada(mensagemId){
    this._socket.emit('mensagemVisualizada', mensagemId);
  }

  public recuperarMensagens(mensagens: MensagemIO[]){

    this._socket.emit('recuperaMensagens', mensagens);

  }

  public comecarConversa(infosObject){

    this._socket.emit('comecar-conversa', infosObject);
    
  }


}