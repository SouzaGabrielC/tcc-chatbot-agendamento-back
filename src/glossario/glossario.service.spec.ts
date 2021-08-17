import { Test, TestingModule } from '@nestjs/testing';
import { GlossarioService } from './glossario.service';

describe('GlossarioService', () => {
  let service: GlossarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlossarioService],
    }).compile();

    service = module.get<GlossarioService>(GlossarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
