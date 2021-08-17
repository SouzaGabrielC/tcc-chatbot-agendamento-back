import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { StatusService } from './status.service';
import { Status } from './status.entity';

@Crud({
  model: {
    type: Status
  }
})
@Controller('status')
export class StatusController {

  constructor(private readonly service: StatusService){ }

}
