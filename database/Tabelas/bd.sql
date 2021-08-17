create database db_chatbot;
use  db_chatbot;

create table tb_glossario(
 id_palavra bigint unsigned unique not null,
 nm_palavra varchar(50),
 ds_palavra varchar(250),
 constraint pk_tb_glossario__id_palavra
 primary key(id_palavra)
 );

create table tb_tipo_problema(
 id_tipo_problema bigint unsigned unique not null,
 nm_tipo varchar(100),
 ds_problema varchar(1000),
 constraint pk_tb_tipo__id_tipo_problema
 primary key(id_tipo_problema)   
);

create table tb_problema(
    id_problema bigint unsigned unique not null,
    nm_usuario varchar(100),
    ds_problema varchar(1000) not null,
    dt_reportado date not null,
    dt_resolucao date,
    ic_resolvido boolean default false,
    id_tipo_problema bigint unsigned,
    constraint pk_tb_problema__id_problema
    primary key(id_problema),
    constraint fk_tb_problema__tb_tipo__id_tipo_problema
    foreign key(id_tipo_problema) references tb_tipo_problema(id_tipo_problema)
);



create table tb_bot(
id_bot bigint unsigned not null unique,
nm_bot varchar(50) not null,
ds_bot varchar(100),
ic_habilitado bool default false,
id_clinica bigint unsigned,
id_dialogo bigint unsigned,
constraint pk_tb_bot__id_bot
primary key(id_bot)
);

create table tb_dialogo(
id_dialogo bigint unsigned unique not null,
nm_dialogo varchar(100) not null,
ds_dialogo varchar(1000),
id_bot bigint unsigned,
constraint pk_tb_dialogo__id_dialogo
primary key (id_dialogo),
constraint fk_tb_dialogo__tb_bot__id_bot
foreign key (id_bot) references tb_bot(id_bot)
);

alter table tb_bot
add constraint fk_tb_bot__tb_dialogo__id_dialogo
foreign key (id_dialogo) references tb_dialogo(id_dialogo);

create table tb_intencao(
id_intencao bigint unsigned not null unique,
nm_intencao varchar(100) not null,
id_bot bigint unsigned,
constraint pk_tb_intencao__id_intencao
primary key (id_intencao),
constraint fk_tb_intencao__tb_bot__id_bot
foreign key (id_bot) references tb_bot(id_bot)
);

create table tb_pergunta(
id_pergunta bigint unsigned not null unique,
ds_pergunta varchar(100) not null,
id_intencao bigint unsigned not null,
constraint pk_tb_pergunta__id_pergunta
primary key(id_pergunta),
constraint fk_tb_pergunta__tb_intencao__id_intencao
foreign key (id_intencao) references tb_intencao(id_intencao)
);

 create table tb_entidade(
id_entidade bigint unsigned not null unique,
nm_entidade varchar(100) not null,
id_bot bigint unsigned,
constraint pk_tb_entidade__id_entidade
primary key (id_entidade),
constraint fk_tb_entidade__tb_bot__id_bot
foreign key (id_bot) references tb_bot(id_bot)
);

create table tb_sub_entidade(
id_sub_entidade bigint unsigned not null unique,
nm_sub_entidade varchar(50) not null,
ic_expressao boolean not null,
id_entidade bigint unsigned,
constraint pk_tb_sub_entidade__id_sub_entidade
primary key (id_sub_entidade),
constraint fk_tb_sub_entidade__tb_entidade__identidade
foreign key(id_entidade) references tb_entidade(id_entidade)
);

create table tb_no(
 id_no bigint unsigned not null,
 nm_no varchar(50) not null,
 vl_ordem int,
 ic_jump bool not null default false,
 ic_wait_input bool not null default false,
 ic_evaluate_children bool not null default false,
 ic_jump_evaluate bool not null default false,
 id_jump_to bigint unsigned,
 id_dialogo bigint unsigned,
 constraint pk_tb_no__id_no__id_dialogo
 primary key (id_no, id_dialogo),
 constraint fk_tb_no__tb_dialogo__id_dialogo
 foreign key (id_dialogo) references tb_dialogo(id_dialogo),
  constraint fk_tb_no__tb_no__id_jump_to
 foreign key (id_jump_to) references tb_no(id_no)
 );

  create table tb_item_no(
 id_item_no bigint unsigned not null unique,
 id_no_pai bigint unsigned not null,
 id_no_filho bigint unsigned not null,
 constraint pk_tb_item_no__id_tem_no
 primary key (id_item_no),
 constraint fk_tb_item_no__tb_no__id_no_pai
 foreign key (id_no_pai) references tb_no(id_no),
constraint fk_tb_item_no__tb_no__id_no_filho
 foreign key (id_no_filho) references tb_no(id_no)
 );

 create table tb_resposta(
 id_resposta bigint unsigned not null unique,
 ds_resposta varchar(100),
 nm_metodo varchar(50),
 ic_metodo bool default false,
 ic_opcao bool default false,
 id_no bigint unsigned,
 constraint pk_tb_resposta__id_resposta
 primary key (id_resposta),
 constraint fk_tb_resposta__tb_no__id_no
 foreign key (id_no) references tb_no(id_no)
 );

  create table tb_opcao(
 id_opcao bigint unsigned not null unique,
 ds_opcap varchar(100) not null,
 vl_opcao int not null,
 id_resposta bigint unsigned not null,
 constraint pk_tb_opcao__id_opcao
 primary key (id_opcao),
 constraint fk_tb_opcao__tb_resposta__id_opcao
 foreign key (id_opcao) references tb_resposta(id_resposta)
 );

create table tb_clinica(
id_clinica bigint unsigned not null unique,
nm_clinica varchar(50) not null,
constraint pk_tb_clinica__id_clinica
primary key (id_clinica)
);

create table tb_unidade(
id_unidade bigint unsigned not null unique,
nm_unidade varchar(50) not null,
cd_cnpj varchar(14),
nm_rua varchar(50) not null,
nm_bairro varchar(50) not null,
cd_cep varchar(9) not null,
cd_numero varchar(5),
ds_complemento varchar(40),
nm_cidade varchar(50) not null,
nm_estado varchar(22) not null,
ic_matriz bool not null default true,
id_clinica bigint unsigned,
constraint pk_tb_unidade__id_unidade
primary key (id_unidade),
constraint fk_tb_unidade__tb_clinica__id_clinica
foreign key (id_clinica) references tb_clinica(id_clinica)
);

alter table tb_bot
add constraint fk_tb_bot__tb_clinica__id_clinica
foreign key (id_clinica) references tb_clinica(id_clinica);

create table tb_convenio(
id_convenio bigint unsigned not null unique,
nm_convenio varchar(50) not null,
ds_email varchar(30),
cd_telefone varchar(11),
cd_cnpj varchar(14),
constraint pk_tb_convenio__id_convenio
primary key(id_convenio)
);

 create table tb_status(
 id_status bigint unsigned not null unique,
 nm_status varchar(50) not null,
 ds_status varchar(100),
 constraint pk_tb_status__id_status
 primary key(id_status)
 );

 create table tb_estado(
id_estado bigint unsigned not null unique,
nm_estado varchar(22) not null,
cd_estado varchar(3) not null,
constraint pk_tb_estado__id_estado
primary key(id_estado)
);

create table tb_paciente(
id_paciente bigint unsigned not null unique,
nm_paciente varchar(50) not null,
dt_nascimento date,
cd_cpf char(11),
cd_telefone varchar(11),
cd_celular varchar(11),
nm_rua varchar(50),
nm_bairro varchar(50),
cd_cep varchar(9),
cd_numero varchar(5),
ds_complemento varchar(30),
nm_cidade varchar(50),
id_estado bigint unsigned,
id_clinica bigint unsigned,
constraint pk_tb_paciente__id_paciente
primary key (id_paciente),
constraint fk_tb_paciente__tb_estado__id_estado
foreign key (id_estado) references tb_estado(id_estado),
constraint fk_tb_paciente__tb_clinica__id_clinica
foreign key(id_clinica) references tb_clinica(id_clinica)
);

create table tb_categoria(
id_categoria bigint unsigned not null unique,
nm_categoria varchar(150) not null,
 constraint pk_tb_categoria__id_categoria
 primary key(id_categoria)
 );
 
create table tb_exame(
id_exame bigint unsigned not null unique,
nm_exame varchar(50) not null,
id_categoria bigint unsigned not null,
constraint pk_tb_exame__id_exame
primary key (id_exame),
constraint fk_tb_exame__tb_categoria__id_categoria
foreign key (id_categoria) references tb_categoria(id_categoria)
);

create table tb_exame_unidade(
id_exame_unidade bigint unsigned not null unique,
ds_exame varchar(3000) not null,
ds_preparo varchar(3000) not null default 'Este exame não precisa de preparo',
ds_observacao varchar(3000)not null default 'Este exame não possui obervação',
tm_retirada smallint unsigned,
ic_retirada_pos_exame bool not null default false,
id_exame bigint unsigned not null,
id_unidade bigint unsigned not null,
constraint pk_tb_exame__id_exame
primary key (id_exame_unidade),

constraint fk_tb_exame_unidade__tb_unidade__id_unidade
foreign key (id_unidade) references tb_unidade(id_unidade),

constraint fk_tb_exame_unidade__tb_exame__id_exame
foreign key(id_exame) references tb_exame(id_exame)
);

create table tb_medico(
id_medico bigint unsigned not null unique,
nm_medico varchar(50) not null,
cd_crm varchar(15) not null,
ds_sexo varchar(10) not null default 'masculino',
cd_telefone varchar(11),
constraint pk_tb_medico__id_medico
primary key (id_medico)
);

create table tb_medico_unidade(
    id_medico bigint unsigned not null,
    id_unidade bigint unsigned not null,
    constraint pk_tb_medico_unidade__id_medico__id_unidade
    primary key(id_medico, id_unidade),
    constraint pk_medico_unidade__tb_medico__id_medico
    foreign key(id_medico) references tb_medico(id_medico),
     constraint pk_medico_unidade__tb_unidade__id_unidade
    foreign key(id_unidade) references tb_unidade(id_unidade)
);

create table tb_convenio_exame(
    id_convenio bigint unsigned not null,
    id_exame bigint unsigned not null,
    constraint pk_tb_convenio_exame
    primary key(id_convenio, id_exame),
    constraint fk_tb_convenio_exame__tb_convenio
    foreign key (id_convenio) references tb_convenio(id_convenio),
    constraint fk_tb_convenio_exame__exame
    foreign key (id_exame) references tb_exame_unidade(id_exame_unidade)
);

 create table tb_agenda(
     id_agenda bigint unsigned not null unique,
     nm_agenda varchar(100) not null,
     id_medico bigint unsigned,
     id_unidade bigint unsigned not null,
     constraint pk_tb_agenda__id_agenda
     primary key (id_agenda),
     constraint fk_tb_agenda__tb_medico__id_medico
     foreign key (id_medico) references tb_medico(id_medico),
     constraint fk_tb_agenda__tb_unidade__id_unidade
     foreign key (id_unidade) references tb_unidade(id_unidade)
 );

 create table tb_exame_agenda(
     id_exame bigint unsigned not null,
     id_agenda bigint unsigned not null,
     constraint pk_tb_exame_agenda
     primary key(id_exame, id_agenda),
     constraint fk_tb_exame_agenda__tb_exame_unidade
     foreign key (id_exame) references tb_exame_unidade(id_exame_unidade),
     constraint fk_tb_exame_agenda__tb_agenda
     foreign key (id_agenda) references tb_agenda(id_agenda)
 );

 create table tb_consulta(
 id_consulta bigint unsigned not null unique,
 nm_paciente varchar(100),
 dt_hr_consulta datetime not null,
 cd_carteirinha varchar(20),
 id_convenio bigint unsigned,
 id_status bigint unsigned,
 id_paciente bigint unsigned,
 id_agenda bigint unsigned not null,
 constraint pk_tb_consulta__id_consulta
 primary key (id_consulta),
 constraint fk_tb_consulta__tb_status__id_status
 foreign key (id_status) references tb_status(id_status),
 constraint fk_tb_consulta__tb_paciente__id_paciente
 foreign key (id_paciente) references tb_paciente(id_paciente),
  constraint fk_tb_consulta__tb_convenio__id_convenio
 foreign key (id_convenio) references tb_convenio(id_convenio),
 constraint fk_tb_consulta__tb_agenda__id_agenda
 foreign key (id_agenda) references tb_agenda(id_agenda)
 );



 create table tb_setor(
    id_setor bigint unsigned not null unique,
    nm_setor varchar(50) not null,
    ds_telefone varchar(11),
    ds_email varchar(50),
    id_unidade bigint unsigned not null,
    constraint pk_tb_setor__id_setor
    primary key (id_setor),
    constraint fk_tb_setor__tb_unidade__id_unidade
    foreign key (id_unidade) references tb_unidade(id_unidade)
);

create table tb_dia(
    id_dia smallint unsigned unique not null,
    nm_dia varchar(15) not null,
    constraint pk_tb_dia__id_dia 
    primary key(id_dia)
);

create table  tb_horario_funcionamento(
id_horario_funcionamento bigint unsigned not null unique,
hr_abertura time not null,
hr_fechamento time not null,
hr_ida_almoco time,
hr_volta_almoco time,
id_setor bigint unsigned,
id_dia smallint unsigned,
constraint pk_tb_horario__id_horario
primary key(id_horario_funcionamento),
constraint fk_tb_horario__tb_setor__id_setor
foreign key(id_setor) references tb_setor(id_setor),
constraint fk_tb_horario__tb_dia__id_dia
foreign key (id_dia) references tb_dia(id_dia)
);

create table tb_funcionario(
id_funcionario bigint unsigned unique not null,
nm_funcionario varchar(50),
cd_celular varchar(11),
nm_login varchar(50),
ds_senha varchar(10) default 'admin',
id_setor bigint unsigned,
constraint pk_tb_funcionario__id_funcionario
primary key (id_funcionario),
constraint fk_tb_funcionario__tb_setor__id_setor
foreign key (id_setor) references tb_setor(id_setor)
);

  create table tb_frase_funcionario(
 id_frase bigint unsigned unique not null,
 ds_frase varchar(500) not null,
 id_funcionario bigint unsigned not null,
 constraint pk_frase_funcionario__id_frase
 primary key (id_frase),
 constraint fk_tb_frase_funcionario__tb_funcionario__id_funcionario
 foreign key (id_funcionario) references tb_funcionario(id_funcionario)
 );

 

 create table tb_sala(
     id_sala bigint unsigned unique not null,
     nm_paciente varchar(100),
     cd_celular_paciente varchar(15),
     ds_email_paciente varchar(100),
     dt_conversa date not null,
     vl_avaliacao int unsigned,
     id_atendente bigint unsigned,
     id_clinica bigint unsigned,
     constraint pk_tb_sala__id_sala
     primary key(id_sala),
     constraint fk_tb_sala__tb_funcionario__id_atendente
     foreign key(id_atendente) references tb_funcionario(id_funcionario),
     constraint fk_tb_sala__tb_clinica__id_clinica
     foreign key(id_clinica) references tb_clinica(id_clinica)
 );

create table tb_mensagem(
    id_mensagem bigint unsigned not null unique,
    ds_frase varchar(3000),
    ic_visualizada boolean default false,
    ic_from_bot boolean default false,
    ic_from_usuario boolean default false,
    ic_from_atendente boolean default false,
    id_sala bigint unsigned,
    constraint pk_tb_mensagem__id_mensagem
    primary key(id_mensagem),
    constraint pk_tb_mensagem__tb_sala__id_sala
    foreign key (id_sala) references tb_sala(id_sala)
);


create table tb_sinonimo_exame(
    id_sinonimo_exame bigint unsigned unique not null,
    nm_sinonimo_exame varchar(300) not null,
    id_exame bigint unsigned not null,
    constraint pk_tb_sinonimo_exame__id_sinonimo_exame
    primary key (id_sinonimo_exame),
    constraint fk_tb_sinonimo__tb_exame__id_exame
    foreign key (id_exame) references tb_exame(id_exame)
);

create table tb_sinonimo_categoria(
    id_sinonimo_categoria bigint unsigned unique not null,
    nm_sinonimo_categoria varchar(300) not null,
    id_categoria bigint unsigned not null,
    constraint pk_tb_sinonimo_categoria__id_sinonimo_categoria
    primary key (id_sinonimo_categoria),
    constraint fk_tb_sinonimo__tb_exame__id_categoria
    foreign key (id_categoria) references tb_categoria(id_categoria)
);

create table tb_sinonimo_sub_entidade(
    id_sinonimo_sub_entidade bigint unsigned unique not null,
    nm_sinonimo_sub_entidade varchar(300) not null,
    id_sub_entidade bigint unsigned not null,
    constraint pk_tb_sinonimo_sub_entidade__id_sinonimo_sub_entidade
    primary key (id_sinonimo_sub_entidade),
    constraint fk_tb_sinonimo__tb_subEntidade__id_sub_entidade
    foreign key (id_sub_entidade) references tb_sub_entidade(id_sub_entidade)
);

create table tb_sinonimo_convenio(
    id_sinonimo_convenio bigint unsigned unique not null,
    nm_sinonimo_convenio varchar(300) not null,
    id_convenio bigint unsigned not null,
    constraint pk_tb_sinonimo_convenio__id_sinonimo_convenio
    primary key (id_sinonimo_convenio),
    constraint fk_tb_sinonimo__tb_convenio__id_convenio
    foreign key (id_convenio) references tb_convenio(id_convenio)
);

create table tb_sinonimo_setor(
    id_sinonimo_setor bigint unsigned unique not null,
    nm_sinonimo_setor varchar(300) not null,
    id_setor bigint unsigned not null,
    constraint pk_tb_sinonimo_setor__id_sinonimo_setor
    primary key (id_sinonimo_setor),
    constraint fk_tb_sinonimo__tb_setor__id_setor
    foreign key (id_setor) references tb_setor(id_setor)
);