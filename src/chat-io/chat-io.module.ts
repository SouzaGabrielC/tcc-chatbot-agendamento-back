import { Module } from '@nestjs/common';
import { ChatIoGateway } from './chat-io.gateway';
import { NamespacesClinicasModule } from './namespaces-clinicas/namespaces-clinicas.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  providers: [ChatIoGateway],
  imports: [NamespacesClinicasModule, UsuariosModule]
})
export class ChatIoModule {}
