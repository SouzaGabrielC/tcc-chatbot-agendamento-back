import { Test, TestingModule } from '@nestjs/testing';
import { ExamesUnidadeController } from './exames-unidade.controller';

describe('ExamesUnidade Controller', () => {
  let controller: ExamesUnidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamesUnidadeController],
    }).compile();

    controller = module.get<ExamesUnidadeController>(ExamesUnidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
