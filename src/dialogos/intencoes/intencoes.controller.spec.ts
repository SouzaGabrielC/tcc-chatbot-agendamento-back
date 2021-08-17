import { Test, TestingModule } from '@nestjs/testing';
import { IntencoesController } from './intencoes.controller';

describe('Intencoes Controller', () => {
  let controller: IntencoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntencoesController],
    }).compile();

    controller = module.get<IntencoesController>(IntencoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
