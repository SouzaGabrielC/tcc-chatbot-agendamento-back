import { Test, TestingModule } from '@nestjs/testing';
import { ExamesUnidadeService } from './exames-unidade.service';

describe('ExamesUnidadeService', () => {
  let service: ExamesUnidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamesUnidadeService],
    }).compile();

    service = module.get<ExamesUnidadeService>(ExamesUnidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
