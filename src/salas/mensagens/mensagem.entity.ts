import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository, ManyToMany, JoinTable } from "typeorm";
import { Sala } from "../sala.entity";
import { Opcao } from "../../dialogos/nos/respostas/opcao.entity";

@Entity('tb_mensagem')
export class Mensagem{

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 800
  })
  ds_mensagem: string;

  @Column()
  ic_visualizada: boolean;

  @Column()
  ic_from_bot: boolean;

  @Column()
  ic_from_usuario: boolean;

  @Column()
  ic_from_atendente: boolean;

  @Column({
    type: 'datetime'
  })
  dt_mensagem: Date;

  /*------- Relacoes -------*/
  
  // Sala
  @ManyToOne(
    type => Sala,
    {
      nullable: false,
      primary: true
    }
  )
  @JoinColumn([
    {
      name: 'id_sala',
      referencedColumnName: 'id'
    },
    {
      name: 'id_clinica',
      referencedColumnName: 'id_clinica'
    }
  ])
  sala: Sala;
  
  opcoes: Opcao[] | {ds_opcao: string; vl_opcao: string}[];


  /*------- Metodos -------*/

  constructor(mensagemTexto: string, opcoes, fromBot: boolean, fromUser: boolean, fromAtendente: boolean){

    this.ds_mensagem = mensagemTexto;
    this.ic_from_bot = fromBot;
    this.ic_from_atendente = fromAtendente;
    this.ic_from_usuario = fromUser;
    this.ic_visualizada = false;
    this.dt_mensagem = new Date();
    this.opcoes = opcoes;

  }

  setVisualizada(){
    this.ic_visualizada = true;
  }

  // @BeforeInsert()
  // private async createId() {

  //   const mensagem = await getRepository(Mensagem)
  //     .createQueryBuilder("mensagem")
  //     .select("mensagem.id")
  //     .where("mensagem.id_sala = :id_sala and mensagem.id_clinica = :id_clinica", { id_clinica: this.sala.clinica.id_clinica, id_sala: this.sala.id })
  //     .orderBy("mensagem.id", "DESC")
  //     .getOne();

  //   if (mensagem) {
  //     this.id = mensagem.id + 1;
  //   } else {
  //     this.id = 1;
  //   }

  // }

}