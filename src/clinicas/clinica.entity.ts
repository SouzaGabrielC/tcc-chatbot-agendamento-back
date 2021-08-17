import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Unidade } from "../unidades/unidade.entity";


@Entity('tb_clinica')
export class Clinica {

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id_clinica: number;

  @Column({
    length: 50
  })
  nm_clinica: string;

  @Column({
    length: 100,
    nullable: true
  })
  ds_site: string;

  @OneToMany(
    type => Unidade,
    unidade => unidade.clinica
  )
  unidades: Unidade[];


}