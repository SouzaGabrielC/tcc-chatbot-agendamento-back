import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";

@Entity('tb_estado')
export class Estado{

  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column({
    length: 50
  })
  nm_estado: string;

  @ApiModelProperty()
  @Column({
    length: 2
  })
  cd_estado: string;

}