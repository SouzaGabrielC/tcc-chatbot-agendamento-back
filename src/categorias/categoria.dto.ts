import { ApiModelProperty } from "@nestjs/swagger";

export class CategoriaDTO{

  @ApiModelProperty()
  readonly nm_categoria: string;

  @ApiModelProperty()
  readonly sinonimos: string[];

}