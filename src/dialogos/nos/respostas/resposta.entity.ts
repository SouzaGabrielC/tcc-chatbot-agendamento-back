import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository, OneToMany } from "typeorm";
import { No } from "../no.entity";
import { Opcao } from "./opcao.entity";

@Entity('tb_resposta')
export class Resposta{ 

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: '400'
  })
  ds_reposta: string;

  @Column({
    default: false
  })
  ic_opcoes: boolean;

  /*------ Relacoes -----*/

  // No
  @PrimaryColumn({
    unsigned: true
  })
  id_no: number;

  @ManyToOne(
    type => No,
  )
  @JoinColumn([
    {
      name: 'id_no',
      referencedColumnName: 'id'
    }
  ])
  no: No;

  // Opcoes
  @OneToMany(
    type => Opcao,
    opcao => opcao.resposta,
    {
      eager: true
    }
  )
  opcoes: Opcao[];

  /*------- Metodos -------*/ 

  @BeforeInsert()
  private async createId(){

    const resposta = await getRepository(Resposta)
    .createQueryBuilder("resposta")
    .select("resposta.id")
    .where("resposta.id_no = :id_no", { id_no: this.no.id})
    .orderBy("resposta.id", "DESC")
    .getOne();

    if(resposta){
      this.id = resposta.id + 1;
    }else{
      this.id = 1;
    }

  }

}