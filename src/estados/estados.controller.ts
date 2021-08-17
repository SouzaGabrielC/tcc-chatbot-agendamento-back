import { Controller } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { Crud } from '@nestjsx/crud';
import { Estado } from './estado.entity';

@Crud({
  model: {
    type: Estado
  }
})
@Controller('estados')
export class EstadosController {
  constructor(private readonly service: EstadosService){

  }
}
