import { Test, TestingModule } from '@nestjs/testing';
import { EntidadesMetodosService } from './entidades-metodos.service';

describe('EntidadesMetodosService', () => {
  let service: EntidadesMetodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntidadesMetodosService],
    }).compile();

    service = module.get<EntidadesMetodosService>(EntidadesMetodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
