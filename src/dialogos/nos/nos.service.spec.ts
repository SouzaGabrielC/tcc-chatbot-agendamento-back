import { Test, TestingModule } from '@nestjs/testing';
import { NosService } from './nos.service';

describe('NosService', () => {
  let service: NosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NosService],
    }).compile();

    service = module.get<NosService>(NosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
