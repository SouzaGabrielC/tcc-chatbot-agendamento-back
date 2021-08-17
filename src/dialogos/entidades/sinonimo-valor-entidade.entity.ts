import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository } from "typeorm";
import { ValorEntidade } from "./valor-entidade.entity";

@Entity('tb_sinonimo_valor_entidade')
export class SinonimoValorEntidade{
  
  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 100
  })
  ds_valor_sinonimo: string;

  /*------ Relacoes ------*/

  @ManyToOne(
    type => ValorEntidade,
    {
      primary: true,
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn([
    {
      name: 'id_valor_entidade',
      referencedColumnName: 'id'
    },
    {
      name: 'id_entidade',
      referencedColumnName: 'id_entidade'
    }
  ])
  valorEntidade: ValorEntidade;


  /*------- Metodos -------*/ 

  @BeforeInsert()
  private async createId(){

    const sinonimo = await getRepository(SinonimoValorEntidade)
    .createQueryBuilder("sinonimo")
    .select("sinonimo.id")
    .where("sinonimo.id_entidade = :id_entidade AND sinonimo.id_valor_entidade = :id_valor_entidade", 
    {
      id_entidade: this.valorEntidade.id_entidade,
      id_valor_entidade: this.valorEntidade.id
    })
    .orderBy("sinonimo.id", "DESC")
    .getOne();

    if(sinonimo){
      this.id = sinonimo.id + 1;
    }else{
      this.id = 1;
    }

  }



} 