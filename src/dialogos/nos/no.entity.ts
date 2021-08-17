import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, BeforeInsert, getRepository, Tree, TreeParent, TreeChildren } from "typeorm";
import { Dialogo } from "../dialogo.entity";
import { Resposta } from "./respostas/resposta.entity";
import { Memoria } from "./memoria.entity";


@Entity('tb_no')
export class No {

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 100
  })
  nm_no: string;

  @Column({
    length: 100
  })
  ds_padrao: string;

  @Column({
    unsigned: true
  })
  vl_ordem: number;

  @Column({
    default: false
  })
  ic_jump: boolean;

  @Column({
    default: true
  })
  ic_wait_input: boolean;

  @Column({
    default: false
  })
  ic_evaluate_children: boolean;

  @Column({
    default: false
  })
  ic_jump_evaluate: boolean;

  @Column({
    default: true
  })
  ic_reposta_aleatoria: boolean;

  index_ultima_resposta: number = null;

  @Column({
    default: false
  })
  ic_metodo: boolean;

  @Column({
    default: false
  })
  ic_metodo_criar_texto: boolean;

  @Column({
    length: 200,
    nullable: true
  })
  nm_metodo: string;

  get padraoSeparado() {
    return this.ds_padrao.split(" ");
  }

  /*------ Relacoes --------*/

  // Dialogo
  @Column({
    unsigned: true
  })
  id_dialogo: number;

  @ManyToOne(
    type => Dialogo
  )
  @JoinColumn({
    name: 'id_dialogo'
  })
  dialogo: Dialogo;

  // No Jump To

  @Column({
    unsigned: true,
    nullable: true
  })
  id_jump_no: number;

  @ManyToOne(
    type => No
  )
  @JoinColumn([
    {
      name: 'id_jump_no',
      referencedColumnName: 'id'
    }
  ])
  jump_no: No;

  //No Pai 
  @Column({
    unsigned: true,
    nullable: true
  })
  id_no_pai: number;

  @ManyToOne(
    type => No,
    no => no.nos_filhos
  )
  @JoinColumn([
    {
      name: 'id_no_pai',
      referencedColumnName: 'id'
    }
  ])
  no_pai: No;

  // Nos Filhos
  @OneToMany(
    type => No,
    no => no.no_pai
  )
  nos_filhos: No[];

  // @TreeChildren()
  // nos_filhos: No[];

  // @Column({
  //   unsigned: true,
  //   nullable: true
  // })
  // noPaiId: number;

  // @TreeParent()
  // no_pai: No;

  //Respostas
  @OneToMany(
    type => Resposta,
    resposta => resposta.no
  )
  respostas: Resposta[];

  //Memorias
  @OneToMany(
    type => Memoria,
    memoria => memoria.no
  )
  memorias: Memoria[];


  /*------- Metodos -------*/

  @BeforeInsert()
  private async createId() {

    const no = await getRepository(No)
      .createQueryBuilder("no")
      .select("no.id")
      .where("no.id_dialogo = :id_dialogo", { id_dialogo: this.id_dialogo })
      .orderBy("no.id", "DESC")
      .getOne();

    if (no) {
      this.id = no.id + 1;
    } else {
      this.id = 1;
    }

  }


}