import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Convenio } from "./convenio.entity";

@Entity('tb_sinonimo_convenio')
export class SinonimoConvenio{

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 100
  })
  nm_sinonimo_convenio: string;

  @ManyToOne(
    type => Convenio,
    {
      nullable: false,
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: 'id_convenio'
  })
  convenio: Convenio;

}