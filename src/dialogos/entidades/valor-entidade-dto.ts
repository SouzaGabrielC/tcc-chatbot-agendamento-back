import { ApiModelProperty } from "@nestjs/swagger";

export class ValorEntidadeDTO{

  @ApiModelProperty()
  readonly nm_valor: string;

  @ApiModelProperty()
  readonly ic_expressao: boolean;

  @ApiModelProperty()
  readonly sinonimos: string[];

}