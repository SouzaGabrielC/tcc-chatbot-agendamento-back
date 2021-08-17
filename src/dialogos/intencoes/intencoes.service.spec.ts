import { Test, TestingModule } from '@nestjs/testing';
import { IntencoesService } from './intencoes.service';

describe('IntencoesService', () => {
  let service: IntencoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntencoesService],
    }).compile();

    service = module.get<IntencoesService>(IntencoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
