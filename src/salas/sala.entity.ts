import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, BeforeInsert, getRepository } from "typeorm";
import { Clinica } from "../clinicas/clinica.entity";
import { Mensagem } from "./mensagens/mensagem.entity";
import { Usuario } from "../chat-io/usuarios/usuario.model";
import { Bot } from "../bots/bot.entity";
import { createHash } from "crypto";

@Entity('tb_sala')
export class Sala{

  @PrimaryColumn(
    {
      type: 'int',
      unsigned: true
    }
  )
  id: number;

  @Column({
    type: 'tinyint',
    nullable: true
  })
  vl_avaliacao: number;

  @Column({
    length: 100,
    nullable: true
  })
  nm_paciente: string;

  @Column({
    length: 16,
    nullable: true
  })
  cd_celular: string;

  @Column({
    length: 100,
    nullable: true
  })
  ds_email: string;

  @Column({
    type: 'datetime'
  })
  dt_hr_inicio: Date;

  @Column({
    type: 'datetime',
    nullable: true
  })
  dt_hr_fim: Date;

  usuario: Usuario;

  private _salaId: string;

  /*------- Relacoes -------*/

  //Clinica
  @PrimaryColumn({
    unsigned: true
  })
  id_clinica: number;

  @ManyToOne(
    type => Clinica,
    {
      nullable: false,
      eager: true
    }
  )
  @JoinColumn({
    name: 'id_clinica'
  })
  clinica: Clinica;

  // Mensagens
  @OneToMany(
    type => Mensagem,
    mensagem => mensagem.sala
  )
  mensagens: Mensagem[];


  /*------- Metodos -------*/

  @BeforeInsert()
  private async createId() {

    const sala = await getRepository(Sala)
      .createQueryBuilder("sala")
      .select("sala.id")
      .where("sala.id_clinica = :id_clinica", { id_clinica: this.clinica.id_clinica })
      .orderBy("sala.id", "DESC")
      .getOne();

    if (sala) {
      this.id = sala.id + 1;
    } else {
      this.id = 1;
    }

  }

  get salaId(){

    if(!this._salaId)
      this._salaId = createHash("md5").update(`${this.id_clinica}/${this.id}`).digest("hex");
      
    return this._salaId;
    
  }

}