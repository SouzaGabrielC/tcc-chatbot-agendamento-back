import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne, BeforeInsert, getRepository } from "typeorm";
import { Convenio } from "../convenios/convenio.entity";
import { Paciente } from "../pacientes/paciente.entity";
import { Agenda } from "../agendas/agenda.entity";
import { Status } from "../status/status.entity";
import { ExameUnidade } from "../unidades/exames-unidade/exame-unidade.entity";

@Entity('tb_consulta')
export class Consulta {

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @Column({
    type: 'date'
  })
  dt_consulta: string;

  @Column({
    type: 'time'
  })
  hr_consulta: string;

  @Column({
    length: 50,
    nullable: true
  })
  cd_carteirinha: string;


  /*------- Relações -------*/

  // Convenio
  @ManyToOne(
    type => Convenio
  )
  @JoinColumn({
    name: 'id_convenio'
  })
  convenio: Convenio;


  // Paciente
  @ManyToOne(
    type => Paciente
  )
  @JoinColumn([
    {
      name: 'id_paciente',
      referencedColumnName: 'id'
    },
    {
      name: 'id_clinica',
      referencedColumnName: 'id_clinica'
    }
  ])
  paciente: Paciente;


  //Agenda
  @PrimaryColumn({
    unsigned: true
  })
  id_agenda: number;

  @PrimaryColumn({
    unsigned: true
  })
  id_unidade: number;

  @ManyToOne(
    type => Agenda
  )
  @JoinColumn([
    {
      name: 'id_agenda',
      referencedColumnName: 'id'
    },
    {
      name: 'id_unidade',
      referencedColumnName: 'id_unidade'
    }
  ])
  agenda: Agenda;

  @ManyToOne(
    type => Status,
    {
      nullable: false
    }
  )
  @JoinColumn({
    name: 'id_status'
  })
  status: Status;

  @ManyToOne(
    type => ExameUnidade,
    {
      nullable: false
    }
  )
  @JoinColumn([
    {
      name: 'id_unidade',
      referencedColumnName: 'id_unidade'
    },
    {
      name: 'id_exame',
      referencedColumnName: 'id_exame'
    }
  ])
  exame: ExameUnidade;



  /*------- Metodos -------*/

  @BeforeInsert()
  private async createId() {

    const consulta = await getRepository(Consulta)
      .createQueryBuilder("consulta")
      .select("consulta.id")
      .where("consulta.id_unidade = :id_unidade and consulta.id_agenda = :id_agenda", { id_unidade: this.id_unidade, id_agenda: this.id_agenda })
      .orderBy("consulta.id", "DESC")
      .getOne();

    if (consulta) {
      this.id = consulta.id + 1;
    } else {
      this.id = 1;
    }

  }


}