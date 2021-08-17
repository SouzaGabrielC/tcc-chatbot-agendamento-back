import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Bot } from "../bots/bot.entity";
import { Entidade } from "./entidades/entidade.entity";
import { Intencao } from "./intencoes/intecao.entity";
import { No } from "./nos/no.entity";
import { LogisticRegressionClassifier } from "natural";
import { DialogosService } from "./dialogos.service";

@Entity('tb_dialogo')
export class Dialogo{

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 50
  })
  nm_dialogo: string;

  @Column({
    length: 200,
    nullable: true
  })
  ds_dialogo: string;

  @Column({
    default: true
  })
  ic_privado: boolean;

  classificador: LogisticRegressionClassifier;

  ic_treinado: boolean = false;

  service: DialogosService;

  /*------- Relações -------*/ 

  // Bot 
  @OneToMany(
    type => Bot,
    bot => bot.dialogo
  )
  bots: Bot[];
  
  // Entidades
  @ManyToMany(
    type => Entidade,
    entidades => entidades.dialogos
  )
  @JoinTable({
    name: 'tb_dialogo_entidade'
  })
  entidades: Entidade[];

  // Intencoes
  @OneToMany(
    type => Intencao,
    intencao => intencao.dialogo 
  )
  intencoes: Intencao[];

  // Nos
  @OneToMany(
    type => No,
    no => no.dialogo
  )
  nos: No[];

}