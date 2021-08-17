import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository } from "typeorm";
import { Clinica } from "../clinicas/clinica.entity";
import { Dialogo } from "../dialogos/dialogo.entity";

@Entity('tb_bot')
export class Bot{

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 50
  })
  nm_bot: string;

  @Column({
    length: 100,
    nullable: true
  })
  ds_bot: string;

  @Column()
  ic_habilitado: boolean;

  /*------- Relações -------*/ 

  //Clinica
  @ManyToOne(
    type => Clinica,
    {
      nullable: false,
      primary: true
    }
  )
  @JoinColumn({
    name: 'id_clinica'
  })
  clinica: Clinica;

  // Dialogo
  @ManyToOne(
    type => Dialogo
  )
  @JoinColumn({
    name: 'id_dialogo'
  })
  dialogo: Dialogo;


  /*------- Metodos -------*/

  @BeforeInsert()
  private async createId(){

    const bot = await getRepository(Bot)
    .createQueryBuilder("bot")
    .select("bot.id")
    .where("bot.id_clinica = :id_clinica", {id_clinica: this.clinica.id_clinica})
    .orderBy("bot.id", "DESC")
    .getOne();

    if(bot){
      this.id = bot.id + 1;
    }else{
      this.id = 1;
    }

  }

}