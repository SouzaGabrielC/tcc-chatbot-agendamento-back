import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository } from "typeorm";
import { Exame } from "./exame.entity";

@Entity('tb_sinonimo_exame')
export class SinonimoExame{

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 100
  })
  nm_sinonimo_exame: string;

  /*------- Relações -------*/ 

  @PrimaryColumn({
    unsigned: true
  })
  id_exame: number;
  
  // Exame
  @ManyToOne(
    type => Exame,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: 'id_exame'
  })
  exame: Exame;

  /*------- Metodos -------*/ 

  @BeforeInsert()
  private async createId(){

    const sinonimo = await getRepository(SinonimoExame)
    .createQueryBuilder("sinonimo")
    .select("sinonimo.id")
    .where("sinonimo.id_exame = :id_exame", {id_exame: this.exame.id_exame})
    .orderBy("sinonimo.id", "DESC")
    .getOne();

    if(sinonimo){
      this.id = sinonimo.id + 1;
    }else{
      this.id = 1;
    }

  }
  
}