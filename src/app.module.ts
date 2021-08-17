import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlossarioModule } from './glossario/glossario.module';
import { ClinicasModule } from './clinicas/clinicas.module';
import { ExamesModule } from './exames/exames.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ConveniosModule } from './convenios/convenios.module';
import { MedicosModule } from './medicos/medicos.module';
import { AgendasModule } from './agendas/agendas.module';
import { UnidadesModule } from './unidades/unidades.module';
import { StatusModule } from './status/status.module';
import { EstadosModule } from './estados/estados.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { ConsultasModule } from './consultas/consultas.module';
import { ProblemasModule } from './problemas/problemas.module';
import { TiposProblemaModule } from './tipos-problema/tipos-problema.module';
import { SalasModule } from './salas/salas.module';
import { BotsModule } from './bots/bots.module';
import { DialogosModule } from './dialogos/dialogos.module';
import { ChatIoModule } from './chat-io/chat-io.module';

// Entidades
import { Dialogo } from './dialogos/dialogo.entity';
import { No } from './dialogos/nos/no.entity';
import { Resposta } from './dialogos/nos/respostas/resposta.entity';
import { Clinica } from './clinicas/clinica.entity';
import { Unidade } from './unidades/unidade.entity';
import { Consulta } from './consultas/consulta.entity';
import { Agenda } from './agendas/agenda.entity';
import { Entidade } from './dialogos/entidades/entidade.entity';
import { Intencao } from './dialogos/intencoes/intecao.entity';
import { Pergunta } from './dialogos/intencoes/perguntas/pergunta.entity';
import { Paciente } from './pacientes/paciente.entity';
import { TipoProblema } from './tipos-problema/tipo-problema.entity';
import { Problema } from './problemas/problema.entity';
import { Status } from './status/status.entity';
import { Sala } from './salas/sala.entity';
import { Mensagem } from './salas/mensagens/mensagem.entity';
import { Bot } from './bots/bot.entity';
import { Medico } from './medicos/medico.entity';
import { Estado } from './estados/estado.entity';
import { Glossario } from './glossario/glossario.entity';
import { Exame } from './exames/exame.entity';
import { Categoria } from './categorias/categoria.entity';
import { Convenio } from './convenios/convenio.entity';
import { SinonimoConvenio } from './convenios/sinonimo-convenio.entity';
import { SinonimoValorEntidade } from './dialogos/entidades/sinonimo-valor-entidade.entity';
import { SinonimoCategoria } from './categorias/sinonimo-categoria.entity';
import { SinonimoExame } from './exames/sinonimo-exame.entity';
import { ExameUnidade } from './unidades/exames-unidade/exame-unidade.entity';
import { ValorEntidade } from './dialogos/entidades/valor-entidade.entity';
import { Opcao } from './dialogos/nos/respostas/opcao.entity';
import { Memoria } from './dialogos/nos/memoria.entity';
import { AgendaTempo } from './agendas/agenda-tempo.entity';

@Module({
  imports: [
    GlossarioModule,
    ClinicasModule,
    ExamesModule,
    CategoriasModule,
    ConveniosModule,
    MedicosModule,
    AgendasModule,
    UnidadesModule,
    StatusModule,
    EstadosModule,
    PacientesModule,
    ConsultasModule,
    ProblemasModule,
    TiposProblemaModule,
    SalasModule,
    BotsModule,
    DialogosModule,
    ChatIoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'api',
      password: 'tcc-api',
      database: 'db_chatbot',
      entities: [
        Dialogo,
        No,
        Resposta,
        Entidade,
        Intencao,
        Pergunta,
        Clinica,
        Unidade,
        Consulta,
        Agenda,
        Paciente,
        TipoProblema,
        Problema,
        Status,
        Sala,
        Mensagem,
        Bot,
        Medico,
        Estado,
        Glossario,
        Exame,
        Categoria,
        Convenio,
        SinonimoCategoria,
        SinonimoConvenio,
        SinonimoExame,
        SinonimoValorEntidade,
        ExameUnidade,
        ValorEntidade,
        Opcao,
        Memoria,
        AgendaTempo
      ],
      synchronize: true,
      logging: true
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
