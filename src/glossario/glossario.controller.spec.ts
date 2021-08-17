import { Test, TestingModule } from '@nestjs/testing';
import { GlossarioController } from './glossario.controller';

describe('Glossario Controller', () => {
  let controller: GlossarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlossarioController],
    }).compile();

    controller = module.get<GlossarioController>(GlossarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
