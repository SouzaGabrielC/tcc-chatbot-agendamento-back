import { Test, TestingModule } from '@nestjs/testing';
import { NosController } from './nos.controller';

describe('Nos Controller', () => {
  let controller: NosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NosController],
    }).compile();

    controller = module.get<NosController>(NosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
