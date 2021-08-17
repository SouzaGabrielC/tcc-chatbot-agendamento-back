import { Test, TestingModule } from '@nestjs/testing';
import { ClassificadorService } from './classificador.service';

describe('ClassificadorService', () => {
  let service: ClassificadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassificadorService],
    }).compile();

    service = module.get<ClassificadorService>(ClassificadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
