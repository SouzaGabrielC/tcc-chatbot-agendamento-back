import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { Clinica } from "../clinicas/clinica.entity";
import { Medico } from "../medicos/medico.entity";
import { Agenda } from "../agendas/agenda.entity";
import { ExameUnidade } from "./exames-unidade/exame-unidade.entity";

@Entity('tb_unidade')
export class Unidade{
 
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id_unidade: number;

  @Column({
    length: 50
  })
  nm_unidade: string;

  @Column({
    nullable: true
  })
  cd_cnpj: string;

  @Column()
  nm_rua: string;

  @Column()
  nm_bairro: string;

  @Column()
  cd_cep: string;

  @Column({
    nullable: true
  })
  cd_numero: string;

  @Column({
    nullable: true
  })
  ds_complemento: string;

  @Column()
  nm_cidade: string;

  @Column()
  nm_estado: string;

  @Column({
    default: false
  })
  ic_matriz: boolean

  @ManyToOne(
    type => Clinica,
    clinica => clinica.unidades,
    {
      onDelete: 'CASCADE',
      nullable: false
    }
  )
  @JoinColumn({
    name: 'id_clinica',
    referencedColumnName: 'id_clinica'
  })
  clinica: Clinica;

  @ManyToMany(
    type => Medico,
    medico => medico.unidades
  )
  medicos: Medico[];

  @OneToMany(
    type => Agenda,
    agenda => agenda.unidade
  )
  agendas: Agenda[];

  @OneToMany(
    type => ExameUnidade,
    exameUnidade => exameUnidade.unidade
  )
  examesUnidade: ExameUnidade[];
 
}