import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Agenda } from './agenda.entity';

@Entity('tb_agenda_tempo')
export class AgendaTempo{

  @ApiModelProperty()
  @PrimaryColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    unsigned: true
  })
  cd_tempo_consulta: number;

  @Column({
    type: 'time'
  })
  hr_inicio_agenda;

  @Column({
    type: 'time'
  })
  hr_fim_agenda;

  @Column()
  dia_semana: number;

  @ManyToOne(
    type => Agenda,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn()
  agenda: Agenda;

}
