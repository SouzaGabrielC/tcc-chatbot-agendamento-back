import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, BeforeInsert, getRepository } from "typeorm";
import { No } from "./no.entity";

@Entity("tb_memoria")
export class Memoria{

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 50
  })
  nm_memoria: string;

  @Column({
    length: 200
  })
  ds_valor: string;

  @Column({
    default: false
  })
  ic_identidade: boolean;

  /*------ Relacoes -----*/

  // No
  @PrimaryColumn({
    unsigned: true
  })
  id_no: number;

  @PrimaryColumn({
    unsigned: true
  })
  id_dialogo: number;

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

  /*------- Metodos -------*/ 

  @BeforeInsert()
  private async createId(){

    const memoria = await getRepository(Memoria)
    .createQueryBuilder("memoria")
    .select("memoria.id")
    .where("memoria.id_dialogo = :id_dialogo AND memoria.id_no = :id_no", {id_dialogo: this.no.id_dialogo, id_no: this.no.id})
    .orderBy("memoria.id", "DESC")
    .getOne();

    if(memoria){
      this.id = memoria.id + 1;
    }else{
      this.id = 1;
    }

  }


}