import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, BeforeInsert, getRepository } from "typeorm";
import { Estado } from "../estados/estado.entity";
import { Clinica } from "../clinicas/clinica.entity";
import { ApiModelProperty } from "@nestjs/swagger";
import { Consulta } from "../consultas/consulta.entity";

@Entity('tb_paciente')
export class Paciente {

  @PrimaryColumn({
    type: 'int',
    unsigned: true
  })
  id: number;

  @ApiModelProperty()
  @Column({
    length: 100
  })
  nm_paciente: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    nullable: true,
    type: 'date'
  })
  dt_nascimento: Date;

  @ApiModelProperty({
    required: false
  })
  @Column({
    type: 'char',
    length: 11
  })
  cd_cpf: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    length: 11,
    nullable: true
  })
  cd_telefone: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    length: 11,
    nullable: true
  })
  cd_celular: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    length: 100,
    nullable: true
  })
  nm_rua: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    length: 50,
    nullable: true
  })
  nm_bairro: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    length: 9,
    nullable: true
  })
  cd_cep: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    length: 5,
    nullable: true
  })
  cd_numero: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    length: 30,
    nullable: true
  })
  ds_complemento: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    length: 50,
    nullable: true
  })
  nm_cidade: string;

  @ApiModelProperty({
    required: true
  })
  @Column({
    length: 300
  })
  ds_email: string;

  
  /*------- Relações -------*/
  
  // Estado
  @ApiModelProperty({
    required: false,
    example: {
      id: 0
    }
  })
  @ManyToOne(
    type => Estado,
    {
      nullable: true
    }
  )
  @JoinColumn({
    name: 'id_estado'
  })
  estado: Estado;

  // Clinica
  @PrimaryColumn(
    { unsigned: true }
  )
  id_clinica: number;

  @ApiModelProperty({
    example: {
      id_clinica: 0
    }
  })
  @ManyToOne(
    type => Clinica,
    {
      eager: true
    }
  )
  @JoinColumn({
    name: 'id_clinica'
  })
  clinica: Clinica;

  // Consultas
  @OneToMany(
    type => Consulta,
    consulta => consulta.paciente
  )
  consultas: Consulta[];

  /*------- Metodos -------*/

  @BeforeInsert()
  private async createId() {

    const paciente = await getRepository(Paciente)
      .createQueryBuilder("paciente")
      .select("paciente.id")
      .where("paciente.id_clinica = :id_clinica", { id_clinica: this.id_clinica })
      .orderBy("paciente.id", "DESC")
      .getOne();

    if (paciente) {
      this.id = paciente.id + 1;
    } else {
      this.id = 1;
    }

  }

}
