import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Dialogo } from "../dialogo.entity";
import { ValorEntidade } from "./valor-entidade.entity";

@Entity('tb_entidade')
export class Entidade {

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 50
  })
  nm_entidade: string;

  @Column({
    default: false
  })
  ic_sistema: boolean;

  @Column({
    default: true
  })
  ic_proximidade: boolean;

  @Column({
    default: false
  })
  ic_metodo: boolean;

  @Column({
    length: 100,
    nullable: true
  })
  nm_metodo: string;

  metodo: Function;

  /*----- Relacoes -------*/

  // Dialogo
  @ManyToMany(
    type => Dialogo,
    dialogos=> dialogos.entidades
  )
  dialogos: Dialogo[];

  // Valores
  @OneToMany(
    type => ValorEntidade,
    valor => valor.entidade,
    {
      eager: true
    }
  )
  valores: ValorEntidade[];


}