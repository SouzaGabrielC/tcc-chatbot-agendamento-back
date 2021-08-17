import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Problema } from "../problemas/problema.entity";

@Entity('tb_tipo_problema')
export class TipoProblema{

  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @Column({
    length: 50
  })
  nm_tipo: string;

  @Column()
  cd_prioridade: number;

  @OneToMany(
    type => Problema,
    problema => problema.tipoProblema
  )
  problemas: Problema[];


}