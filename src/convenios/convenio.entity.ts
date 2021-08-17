import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, OneToMany } from "typeorm";
import { ExameUnidade } from "../unidades/exames-unidade/exame-unidade.entity";
import { Consulta } from "../consultas/consulta.entity";
import { SinonimoConvenio } from "./sinonimo-convenio.entity";

@Entity('tb_convenio')
export class Convenio{

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id_convenio: number;

  @Column({
    length: 50
  })
  nm_convenio: string;

  @Column({
    length: 100,
    nullable: true
  })
  ds_email: string;

  @Column({
    length: 11,
    nullable: true
  })
  cd_telefone: string;

  @Column({
    length: 14,
    nullable: true
  })
  cd_cnpj: string;

  /*------- Relações -------*/ 

  // Exame Unidade
  @ManyToMany(
    type => ExameUnidade,
    exame => exame.convenios
  )
  examesUnidade: ExameUnidade[];

  // Consulta
  @OneToMany(
    type => Consulta,
    consulta => consulta.convenio
  )
  consultas: Consulta[];

  //Sinonimo Convenio
  @OneToMany(
    type => SinonimoConvenio,
    sinonimo => sinonimo.convenio,
    {
      eager: true
    }
  )
  sinonimos: SinonimoConvenio[];
  
}