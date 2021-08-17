import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Unidade } from "../unidade.entity";
import { Exame } from "../../exames/exame.entity";
import { Convenio } from "../../convenios/convenio.entity";
import { Agenda } from "../../agendas/agenda.entity";
import { Consulta } from "../../consultas/consulta.entity";

@Entity('tb_exame_unidade')
export class ExameUnidade {

  @PrimaryColumn({
    unsigned: true
  })
  id_unidade: number;

  @ManyToOne(
    type => Unidade
  )
  @JoinColumn({
    name: 'id_unidade'
  })
  unidade: Unidade;

  @PrimaryColumn({
    unsigned: true
  })
  id_exame: number;

  @ManyToOne(
    type => Exame,
    {
      eager: true
    }
  )
  @JoinColumn({
    name: 'id_exame'
  })
  exame: Exame;

  @Column({
    length: 3000,
    default: 'Este exame não possui descrição'
  })
  ds_exame: string;

  @Column({
    length: 3000,
    default: 'Este exame não possui obervação'
  })
  ds_observacao: string;

  @Column({
    length: 3000,
    default: 'Este exame não precisa de preparo'
  })
  ds_preparo: string;

  @Column({
    type: "double",
    nullable: true
  })
  vl_exame: number;

  @Column()
  ic_retirada_pos_exame: boolean;

  @Column({
    type: 'tinyint',
    nullable: true
  })
  tm_retirada: number;

  @OneToMany(
    type => Consulta,
    consulta => consulta.exame
  )
  consultas: Consulta[];

  @ManyToMany(
    type => Agenda,
    agenda => agenda.examesUnidade
  )
  agendas: Agenda[];

  @ManyToMany(
    type => Convenio,
    convenio => convenio.examesUnidade
  )
  @JoinTable({
    name: 'tb_exame_unidade_convenio'
  })
  convenios: Convenio[];
}