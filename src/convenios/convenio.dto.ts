import { ApiModelProperty } from "@nestjs/swagger";

export class ConvenioDTO{

  @ApiModelProperty()
  readonly nm_convenio: string;

  @ApiModelProperty()
  readonly ds_email: string;

  @ApiModelProperty()
  readonly cd_telefone: string;

  @ApiModelProperty()
  readonly cd_cnpj: string;

  @ApiModelProperty()
  readonly sinonimos: string[];
}