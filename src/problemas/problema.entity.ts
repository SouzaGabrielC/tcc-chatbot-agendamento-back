import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { TipoProblema } from "../tipos-problema/tipo-problema.entity";

@Entity('tb_problema')
export class Problema{

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 100
  })
  nm_usuario: string;

  @Column()
  ic_resolvido: boolean;

  @Column()
  dt_resolucao: Date;

  @Column()
  dt_reportado: Date;

  @Column({
    length: 1000
  })
  ds_problema: string;

  @ManyToOne(
    type => TipoProblema,
    {
      nullable: false
    }
  )
  @JoinColumn({
    name: 'id_tipo_problema'
  })
  tipoProblema: TipoProblema;

}