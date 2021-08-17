import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository, OneToMany } from "typeorm";
import { Entidade } from "./entidade.entity";
import { SinonimoValorEntidade } from "./sinonimo-valor-entidade.entity";

@Entity('tb_valor_entidade')
export class ValorEntidade {

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 100
  })
  nm_valor: string;

  @Column({
    default: false
  })
  ic_expressao: boolean;

  /*------ Relacoes ------*/

  @PrimaryColumn({
    unsigned: true
  })
  id_entidade: number;

  @ManyToOne(
    type => Entidade
  )
  @JoinColumn({
    name: 'id_entidade'
  })
  entidade: Entidade;

  @OneToMany(
    type => SinonimoValorEntidade,
    sinonimo => sinonimo.valorEntidade,
    {
      eager: true,
      onDelete: 'CASCADE'
    }
  )
  sinonimos: SinonimoValorEntidade[];

  /*------- Metodos -------*/ 

  @BeforeInsert()
  private async createId(){

    const valor = await getRepository(ValorEntidade)
    .createQueryBuilder("valor")
    .select("valor.id")
    .where("valor.id_entidade = :id_entidade", {id_entidade: this.entidade.id})
    .orderBy("valor.id", "DESC")
    .getOne();

    if(valor){
      this.id = valor.id + 1;
    }else{
      this.id = 1;
    }

  }

}