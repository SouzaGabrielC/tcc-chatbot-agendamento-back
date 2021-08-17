import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Exame } from "../exames/exame.entity";
import { SinonimoCategoria } from "./sinonimo-categoria.entity";

@Entity('tb_categoria')
export class Categoria{

  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true
  })
  id_categoria: number;

  @Column({
    length: 150
  })
  nm_categoria: string;

  @OneToMany(
    type => Exame,
    exame => exame.categoria
  )
  exames: Exame[];

  @OneToMany(
    type => SinonimoCategoria,
    sinonimo => sinonimo.categoria,
    {
      eager: true
    }
  )
  sinonimos: SinonimoCategoria[];

}