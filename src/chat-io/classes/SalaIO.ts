import { Usuario } from "../usuarios/usuario.model";
import { Subject } from "rxjs";
import { Mensagem } from "../../salas/mensagens/mensagem.entity";
import { SalasService } from "../../salas/salas.service";
import { Sala } from "../../salas/sala.entity";
import { BotAtendente } from "./BotAtendente";
import { MensagemIO } from "./MensagemIO";

export class SalaIO{

  public salasService: SalasService;
  private sala: Sala;
  public botAtendente: BotAtendente;
  protected _usuario: Usuario;
  public mensagens: Mensagem[];

  protected _timeoutDestruirSala: NodeJS.Timeout;

  public destruirSalaSubject: Subject<string>;

  constructor(service: SalasService){
    this.salasService = service;
    this.destruirSalaSubject = new Subject<string>();
    this.mensagens = [];
  }

  async criarSala(clinica){
    this.sala = await this.salasService.criarSala(clinica);
  }

  get salaId(){
    return this.sala.salaId;
  }

  get usuario() {
    return this._usuario;
  }


  set usuario(usuario: Usuario) {

    if(this._timeoutDestruirSala) clearTimeout(this._timeoutDestruirSala);

    this._usuario && this._usuario.onMensagem.unsubscribe();
    this._usuario && this._usuario.onDisconnect.unsubscribe();
    this._usuario && this._usuario.onTerminarChat.unsubscribe();
    this._usuario && this._usuario.onMensagemVisualizada.unsubscribe();

    delete this._usuario;

    this._usuario = usuario;

    this._usuario.onMensagem.subscribe(async (mensagem: Mensagem) => {
      const mensagemIO = this.adicionarMensagem(mensagem);
      this.usuario.enviarMensagemParaUsuario(mensagemIO);
      await this.mensagemFromUser(mensagemIO);
    });

    this._usuario.onDisconnect.subscribe(() => {
      this.usuarioDisconnected();
    });

    this._usuario.onTerminarChat.subscribe(() => {
      this.usuarioTerminouChat();
    });

    this._usuario.onMensagemVisualizada.subscribe((mensagemId: number) => {
      this.visualizarMensagem(mensagemId);
    });
    
    this._usuario.comecarConversa({
      salaId: this.salaId,
      nomeClinica: this.sala.clinica.nm_clinica,
      nomeBot: this.botAtendente.nome
    });

  }

  private recuperarMensagens(): MensagemIO[]{

    const mensagens = this.mensagens.map(mensagem => new MensagemIO(
                                                            mensagem.id,
                                                            mensagem.ds_mensagem,
                                                            mensagem.opcoes,
                                                            mensagem.ic_from_bot,
                                                            mensagem.ic_from_usuario,
                                                            mensagem.ic_from_atendente,
                                                            mensagem.ic_visualizada,
                                                          ));
    return mensagens;                                                    

  }

  private adicionarMensagem(mensagem: Mensagem): MensagemIO{

    mensagem.sala = this.sala;
    mensagem.id = this.mensagens.length;
    this.mensagens.push(mensagem);

    const mensagemIO = new MensagemIO(
      mensagem.id,
      mensagem.ds_mensagem,
      mensagem.opcoes,
      mensagem.ic_from_bot,
      mensagem.ic_from_usuario,
      mensagem.ic_from_atendente,
      mensagem.ic_visualizada
    );

    return mensagemIO;

  } 

  async iniciarConversa() {

    if(!this.mensagens || this.mensagens.length === 0){
      
      try {

        const resposta = await this.botAtendente.responder("");
  
        const mensagemBot = this.adicionarMensagem(new Mensagem(resposta.texto, resposta.opcoes,true, false, false));
  
        this.usuario.enviarMensagemParaUsuario(mensagemBot);
  
      } catch (error) {
  
        console.error(error);
        
        const mensagemBot = this.adicionarMensagem(new Mensagem("Desculpe, houve um problema na comunicação tente novamente mais tarde.", null, true, false, false));
  
        this.usuario.enviarMensagemParaUsuario(mensagemBot);
  
      }

    }else{
      this.usuario.recuperarMensagens(this.recuperarMensagens());
    }


  }

  async mensagemFromUser(mensagem: MensagemIO) {

    try {
      
      this.usuario.mensagemVisualizada(mensagem.id);

      this.visualizarMensagem(mensagem.id);
      
      const resposta = await this.botAtendente.responder(mensagem.texto.toString());

      if(resposta){

        const mensagemBot = this.adicionarMensagem(new Mensagem(resposta.texto, resposta.opcoes, true, false, false));
  
        this.usuario.enviarMensagemParaUsuario(mensagemBot);
        
      }

    } catch (error) {

      console.error(error);

      const mensagemBot = this.adicionarMensagem(new Mensagem("Desculpe, houve um problema na comunicação tente novamente mais tarde.", null, true, false, false));

      this.usuario.enviarMensagemParaUsuario(mensagemBot);

    }

    return;

  }

  usuarioDisconnected() {

    this._timeoutDestruirSala = setTimeout(() => {

      this.destruirSala();

    }, 120000);

  }

  usuarioTerminouChat() {

    this.destruirSala();
    
  }

  private destruirSala(){

    this.salasService
    .finalizarSala(this.sala, this.mensagens)
    .then(() => {
      this.destruirSalaSubject.next(this.salaId);
    })
    .catch(err => {
      console.error(err);
      this.destruirSalaSubject.next(this.salaId);
    });
    
  }

  visualizarMensagem(mensagemId: number) {

    for (let index in this.mensagens) {
      if (this.mensagens[index].id === mensagemId) {
        this.mensagens[index].setVisualizada();
        break;
      }
    }

  }




}