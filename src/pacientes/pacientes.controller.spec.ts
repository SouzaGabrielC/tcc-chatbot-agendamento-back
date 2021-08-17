import { Test, TestingModule } from '@nestjs/testing';
import { PacientesController } from './pacientes.controller';

describe('Pacientes Controller', () => {
  let controller: PacientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacientesController],
    }).compile();

    controller = module.get<PacientesController>(PacientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
