import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NamespacesClinicasService } from './namespaces-clinicas/namespaces-clinicas.service';

@WebSocketGateway()
export class ChatIoGateway {

  @WebSocketServer()
  ws: Server;

  constructor(private readonly namespacesClinicasService: NamespacesClinicasService) {

    

    namespacesClinicasService
      .criarTodosNamespacesClinicas()
      .then(namespaces => {

        namespaces
          .forEach(namespace => {

            const wsNamespace = this.ws.of(namespace.id);
            wsNamespace.on("connection", this.namespacesClinicasService.namespaceOnConnection.bind(this.namespacesClinicasService));

          });

      });

  }

}
