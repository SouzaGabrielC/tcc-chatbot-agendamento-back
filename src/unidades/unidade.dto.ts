import { ApiModelProperty } from "@nestjs/swagger";

export class UnidadeDTO{
  
  @ApiModelProperty()
  readonly id_clinica: number;

  @ApiModelProperty()
  readonly nm_unidade: string;

  @ApiModelProperty()
  readonly cd_cnpj: string;

  @ApiModelProperty()
  readonly nm_rua: string;

  @ApiModelProperty()
  readonly nm_bairro: string;

  @ApiModelProperty()
  readonly cd_cep: string;

  @ApiModelProperty()
  readonly cd_numero: string;

  @ApiModelProperty()
  readonly ds_complemento: string;

  @ApiModelProperty()
  readonly nm_cidade: string;

  @ApiModelProperty()
  readonly nm_estado: string;

  @ApiModelProperty()
  readonly ic_matriz: boolean;

}