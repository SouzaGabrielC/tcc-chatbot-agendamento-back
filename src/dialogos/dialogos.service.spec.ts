import { Test, TestingModule } from '@nestjs/testing';
import { DialogosService } from './dialogos.service';

describe('DialogosService', () => {
  let service: DialogosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DialogosService],
    }).compile();

    service = module.get<DialogosService>(DialogosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
