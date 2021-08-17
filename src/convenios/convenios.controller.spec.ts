import { Test, TestingModule } from '@nestjs/testing';
import { ConveniosController } from './convenios.controller';

describe('Convenios Controller', () => {
  let controller: ConveniosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConveniosController],
    }).compile();

    controller = module.get<ConveniosController>(ConveniosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
