import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_glossario")
export class Glossario{

  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true
  })
  id_palavra: number;

  @Column({
    length: 50
  })
  nm_palavra: string;

  @Column({
    length: 250
  })
  ds_palavra: string;

}
