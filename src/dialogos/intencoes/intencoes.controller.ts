import { Controller, Get } from '@nestjs/common';
import { IntencoesService } from './intencoes.service';

@Controller('intencoes')
export class IntencoesController {

  constructor(private readonly intencoesService: IntencoesService){ }


}
