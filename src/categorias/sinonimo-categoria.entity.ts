import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository } from "typeorm";
import { Categoria } from "./categoria.entity";

@Entity('tb_sinonimo_categoria')
export class SinonimoCategoria{

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 100
  })
  nm_sinonimo_categoria: string;

  /*------- Relações -------*/ 

  // Categoria
  @ManyToOne(
    type => Categoria,
    {
      primary: true,
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: 'id_categoria'
  })
  categoria: Categoria;


  /*------- Metodos -------*/ 
  
  @BeforeInsert()
  private async createId(){

    const sinonimo = await getRepository(SinonimoCategoria)
    .createQueryBuilder("sinonimo")
    .select("sinonimo.id")
    .where("sinonimo.id_categoria = :id_categoria", {id_categoria: this.categoria.id_categoria})
    .orderBy("sinonimo.id", "DESC")
    .getOne();

    if(sinonimo){
      this.id = sinonimo.id + 1;
    }else{
      this.id = 1;
    }

  }

}