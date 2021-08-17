import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, ManyToMany, JoinTable, OneToMany, BeforeInsert, getRepository, RelationId } from "typeorm";
import { Unidade } from "../unidades/unidade.entity";
import { Medico } from "../medicos/medico.entity";
import { ApiModelProperty } from "@nestjs/swagger";
import { ExameUnidade } from "../unidades/exames-unidade/exame-unidade.entity";
import { Consulta } from "../consultas/consulta.entity";
import { AgendaTempo } from './agenda-tempo.entity';

@Entity('tb_agenda')
export class Agenda{

  @ApiModelProperty()
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @ApiModelProperty()
  @Column({
    length: 100
  })
  nm_agenda: string;

  @Column({
    default: true
  })
  ic_agendamento_automatico: boolean;

  /*------- Relações -------*/ 

  // Unidade
  
  @PrimaryColumn({
    unsigned: true
  })
  id_unidade: number;

  @ApiModelProperty({
    example: {
      id_unidade: 0
    },
    required: true
  })
  @ManyToOne(
    tyepe => Unidade,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn({
    name: 'id_unidade'
  })
  unidade: Unidade;

  // Medico

  @ApiModelProperty({
    example: {
      id_medico: 0
    },
    required: true
  })
  @ManyToOne(
    type=> Medico
  )
  @JoinColumn({
    name: 'id_medico'
  })
  medico: Medico;

  // Exame-Unidade

  @ManyToMany(
    type => ExameUnidade,
    exameUnidade => exameUnidade.agendas
  )
  @JoinTable({
    name: "tb_exame_agenda"
  })
  examesUnidade: ExameUnidade[];

  // Consulta

  @OneToMany(
    type => Consulta,
    consulta => consulta.agenda
  )
  consultas: Consulta[];

  // AgendaTempo
  @OneToMany(
    type => AgendaTempo,
    tempo => tempo.agenda,
    {
      eager: true
    }
  )
  tempos: AgendaTempo[];

  /*------- Metodos -------*/

  @BeforeInsert()
  private async createId(){

    const agendaId = await getRepository(Agenda)
    .createQueryBuilder("agenda")
    .select("agenda.id")
    .where("agenda.id_unidade = :id_unidade", {id_unidade: this.unidade.id_unidade})
    .orderBy("agenda.id", "DESC")
    .getOne();

    if(agendaId){
      this.id = agendaId.id + 1;
    }else{
      this.id = 1;
    }

  }

}
