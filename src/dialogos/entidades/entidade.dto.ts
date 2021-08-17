import { ApiModelProperty } from "@nestjs/swagger";
import { ValorEntidadeDTO } from "./valor-entidade-dto";
export class EntidadeDTO{

  @ApiModelProperty()
  readonly nm_entidade: string;

  @ApiModelProperty()
  readonly ic_sistema: boolean;

  @ApiModelProperty()
  readonly ic_proximidade: boolean;

  @ApiModelProperty()
  readonly ic_metodo: boolean;

  @ApiModelProperty()
  readonly nm_metodo: string;

  @ApiModelProperty()
  readonly valores: ValorEntidadeDTO[];
}