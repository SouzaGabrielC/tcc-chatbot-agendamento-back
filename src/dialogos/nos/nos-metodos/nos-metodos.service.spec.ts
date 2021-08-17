import { Test, TestingModule } from '@nestjs/testing';
import { NosMetodosService } from './nos-metodos.service';

describe('NosMetodosService', () => {
  let service: NosMetodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NosMetodosService],
    }).compile();

    service = module.get<NosMetodosService>(NosMetodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
