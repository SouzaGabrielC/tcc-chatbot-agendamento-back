import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository, ManyToMany } from "typeorm";
import { Resposta } from "./resposta.entity";
import { Mensagem } from "../../../salas/mensagens/mensagem.entity";

@Entity('tb_opcao')
export class Opcao{

  @PrimaryColumn({
    unsigned: true
  })
  id: number;

  @Column({
    length: 100
  })
  ds_opcao: string;

  @Column({
    length: 100
  })
  vl_opcao: string;

  // Resposta
  @PrimaryColumn({
    unsigned: true
  })
  id_resposta: number;

  @PrimaryColumn({
    unsigned: true
  })
  id_no: number;

  @ManyToOne(
    type => Resposta
  )
  @JoinColumn([
    {
      name: 'id_resposta',
      referencedColumnName: 'id'
    },
    {
      name: 'id_no',
      referencedColumnName: 'id_no'
    }
  ])
  resposta: Resposta;

  @ManyToMany(
    type => Mensagem 
  )
  mensagens: Mensagem[];


  /*------- Metodos -------*/ 

  @BeforeInsert()
  private async createId(){

    const opcao = await getRepository(Opcao)
    .createQueryBuilder("opcao")
    .select("opcao.id")
    .where("opcao.id_no = :id_no AND opcao.id_resposta = :id_resposta", 
    {
      id_resposta: this.resposta.id, 
      id_no: this.resposta.id_no
    })
    .orderBy("opcao.id", "DESC")
    .getOne();

    if(opcao){
      this.id = opcao.id + 1;
    }else{
      this.id = 1;
    }

  }



}