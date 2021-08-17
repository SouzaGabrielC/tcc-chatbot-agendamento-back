import { ApiModelProperty } from "@nestjs/swagger";

export class AgendaExameDTO{

  @ApiModelProperty()
  readonly id_exame: number;

  @ApiModelProperty()
  readonly id_unidade: number;


}