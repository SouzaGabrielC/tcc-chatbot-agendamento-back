import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Unidade } from "../unidades/unidade.entity";
import { Agenda } from "../agendas/agenda.entity";

@Entity('tb_medico')
export class Medico {

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id_medico: number;

  @Column({
    length: 50
  })
  nm_medico: string;

  @Column({
    length: 15
  })
  cd_crm: string;

  @Column({
    length: 11,
    nullable: true
  })
  cd_telefone: string;

  @Column({
    length: 10
  })
  ds_sexo: string;

  /*------ Relacoes --------*/

  // Unidade
  @ManyToMany(
    type => Unidade,
    unidade => unidade.medicos
  )
  @JoinTable({
    name: "tb_medico_unidade"
  })
  unidades: Unidade[];

  // Agenda
  @OneToMany(
    type => Agenda,
    agenda => agenda.medico
  )
  agendas: Agenda[];

}