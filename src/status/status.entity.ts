import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";

@Entity('tb_status')
export class Status{

  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @ApiModelProperty()
  @Column({
    length: 50
  })
  nm_status: string;

  @ApiModelProperty({
    required: false
  })
  @Column({
    length: 100,
    nullable: true
  })
  ds_status: string

}