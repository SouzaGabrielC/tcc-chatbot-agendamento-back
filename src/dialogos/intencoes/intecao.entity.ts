import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, getRepository, OneToMany, AfterUpdate } from "typeorm";
import { Dialogo } from "../dialogo.entity";
import { Pergunta } from "./perguntas/pergunta.entity";
import { Subject } from "rxjs";

@Entity('tb_intencao')
export class Intencao {

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    length: 50
  })
  nm_intencao: string;

  afterUpdateSubject: Subject<{ id: number, id_dialogo: number }>;

  /*------- Relações -------*/

  // Dialogo
  @PrimaryColumn({
    type: 'int',
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

  @OneToMany(
    type => Pergunta,
    pergunta => pergunta.intencao
  )
  perguntas: Pergunta[];


  /*------- Metodos -------*/

  constructor() {
    this.afterUpdateSubject = new Subject<{
      id: number,
      id_dialogo: number
    }>();
  }

  @BeforeInsert()
  private async createId() {

    const intencaoId = await getRepository(Intencao)
      .createQueryBuilder("intencao")
      .select("intencao.id")
      .where("intencao.id_dialogo = :id_dialogo", { id_dialogo: this.dialogo.id })
      .orderBy("intencao.id", "DESC")
      .getOne();

    if (intencaoId) {
      this.id = intencaoId.id + 1;
    } else {
      this.id = 1;
    }

  }

  @AfterUpdate()
  public afterUpdate(){

    this.afterUpdateSubject.next({
      id: this.id,
      id_dialogo: this.id_dialogo
    });

  }


}