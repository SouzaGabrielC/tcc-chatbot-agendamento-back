import { ApiModelProperty } from "@nestjs/swagger";

export class ExameUnidadeDTO{

  @ApiModelProperty()
  readonly id_exame: number;

  @ApiModelProperty()
  readonly ds_exame: string;

  @ApiModelProperty()
  readonly ds_observacao: string;

  @ApiModelProperty()
  readonly ds_preparo: string;

  @ApiModelProperty()
  readonly tm_retirada: number;

  @ApiModelProperty()
  readonly vl_exame: number;

  @ApiModelProperty()
  readonly ic_retirada_pos_exame: boolean;

}