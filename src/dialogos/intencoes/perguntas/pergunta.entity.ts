import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository } from "typeorm";
import { Intencao } from "../intecao.entity";

@Entity('tb_pergunta')
export class Pergunta{

  @PrimaryColumn({
    unsigned: true
  })
  id: number;

  @Column({
    length: 300
  })
  ds_pergunta: string;

  @ManyToOne(
    type => Intencao,
    {
      primary: true
    }
  )
  @JoinColumn([
    {
      name: 'id_intencao',
      referencedColumnName: 'id'
    },
    {
      name: 'id_dialogo',
      referencedColumnName: 'id_dialogo'
    }
  ])
  intencao: Intencao;


  /*------- Metodos -------*/ 

  @BeforeInsert()
  private async createId(){

    const pergunta = await getRepository(Pergunta)
    .createQueryBuilder("pergunta")
    .select("pergunta.id")
    .where("pergunta.id_dialogo = :id_dialogo AND pergunta.id_intencao = :id_intencao", {id_dialogo: this.intencao.id_dialogo, id_intencao: this.intencao.id})
    .orderBy("pergunta.id", "DESC")
    .getOne();

    if(pergunta){
      this.id = pergunta.id + 1;
    }else{
      this.id = 1;
    }

  }
}