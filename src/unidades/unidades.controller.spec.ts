import { Test, TestingModule } from '@nestjs/testing';
import { UnidadesController } from './unidades.controller';

describe('Unidades Controller', () => {
  let controller: UnidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadesController],
    }).compile();

    controller = module.get<UnidadesController>(UnidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
