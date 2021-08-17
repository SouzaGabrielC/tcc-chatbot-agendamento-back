import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Categoria } from "../categorias/categoria.entity";
import { SinonimoExame } from "./sinonimo-exame.entity";

@Entity('tb_exame')
export class Exame{

  @PrimaryColumn(
    {
      type: 'int',
      unsigned: true,
      generated: true
    }
  )
  id_exame: number;

  @Column({
    length: 100
  })
  nm_exame: string;

  /*------- Relações -------*/ 

  // Categoria
  @ManyToOne(
    type => Categoria,
    categoria => categoria.exames,
    {
      eager: true
    }
  )
  @JoinColumn({
    name: 'id_categoria'
  })
  categoria: Categoria;

  //Sinonimo Exame
  @OneToMany(
    type => SinonimoExame,
    sinonimo => sinonimo.exame,
    {
      eager: true
    }
  )
  sinonimos: SinonimoExame[];

}