import { ApiModelProperty } from "@nestjs/swagger";

export class MedicoDTO{

  @ApiModelProperty()
  readonly nm_medico: string;

  @ApiModelProperty()
  readonly cd_crm: string;

  @ApiModelProperty()
  readonly cd_telefone: string;

  @ApiModelProperty()
  readonly ds_sexo: string;

}