import { Injectable } from '@nestjs/common';
import { ClinicasService } from '../../clinicas/clinicas.service';
import { Clinica } from '../../clinicas/clinica.entity';
import { NamespaceClinica } from './namespaces-clinicas.model';
import { Socket } from 'socket.io';
import { Usuario } from '../usuarios/usuario.model';
import { Bot } from '../../bots/bot.entity';
import { BotsService } from '../../bots/bots.service';
import { SalasService } from '../../salas/salas.service';
import { SalaIO } from '../classes/SalaIO';
import { BotAtendente } from '../classes/BotAtendente';

@Injectable()
export class NamespacesClinicasService {

  private namespacesClinicas: NamespaceClinica[] = [];

  constructor(
    private readonly clinicaService: ClinicasService, 
    private readonly botsService: BotsService,

    private readonly salasService: SalasService
    ){ }

  async criarTodosNamespacesClinicas(): Promise<NamespaceClinica[]>{

    const clinicas: Clinica[] = await this.clinicaService.buscarTodasClinicas();

    for(const clinica of clinicas){

      const namespace = new NamespaceClinica(clinica);

      const bot: Bot = await this.botsService.criarBotClinica(clinica);
      
      bot.clinica = clinica;

      namespace.bot = bot;

      this.namespacesClinicas.push(namespace);

      console.log("------------- NAMESPACE ID: ", namespace.id);
    }

    return this.buscarTodosNamespacesClincas();

  }

  buscarTodosNamespacesClincas(): NamespaceClinica[]{
    return this.namespacesClinicas;
  }

  async namespaceOnConnection(socket: Socket){
    
    const namespaceId: string = socket.nsp.name.slice(1, socket.nsp.name.length);

    const salaId = socket.handshake.query['sala_id'];

    const novoUsuario = new Usuario(socket);

    const namespaceClinica: NamespaceClinica = this.namespacesClinicas.find(namespace => namespace.id === namespaceId);

    const sala = this.acharSalaNoNamespace(namespaceClinica, salaId);

    if(sala){

      sala.usuario = novoUsuario;

      await sala.iniciarConversa();

    }else{
      
      const salaCriada = new SalaIO(this.salasService);

      await salaCriada.criarSala(namespaceClinica.clinica);

      salaCriada.botAtendente = new BotAtendente(namespaceClinica.bot);

      salaCriada.usuario = novoUsuario;

      salaCriada.destruirSalaSubject.subscribe(salaDestruirId => {
        this.removerSalaNamespace(namespaceClinica, salaDestruirId);
      });

      await salaCriada.iniciarConversa();

      namespaceClinica.salas.push(salaCriada);
      
    }


  }

  acharSalaNoNamespace(namespace: NamespaceClinica, salaId: string): SalaIO{

    for(const sala of namespace.salas){
      if(sala.salaId === salaId)
        return sala;
    }

    return null;

  }

  removerSalaNamespace(namespace: NamespaceClinica, salaId: string){

    for(const index in namespace.salas){
      if(namespace.salas[index].salaId === salaId)
        namespace.salas.splice(parseInt(index), 1);
    }

  }

}
