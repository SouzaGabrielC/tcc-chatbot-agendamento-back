import { ApiModelProperty } from "@nestjs/swagger";

export class ExameDTO{

  @ApiModelProperty()
  readonly nm_exame: string;

  @ApiModelProperty()
  readonly id_categoria: number;

  @ApiModelProperty()
  readonly sinonimos: string[];

}