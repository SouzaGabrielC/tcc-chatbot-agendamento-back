import { Test, TestingModule } from '@nestjs/testing';
import { ChatIoGateway } from './chat-io.gateway';

describe('ChatIoGateway', () => {
  let gateway: ChatIoGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatIoGateway],
    }).compile();

    gateway = module.get<ChatIoGateway>(ChatIoGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
