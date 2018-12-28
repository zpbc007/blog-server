import { Test, TestingModule } from '@nestjs/testing';
import { MockController } from './mock.controller';

describe('Mock Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MockController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MockController = module.get<MockController>(MockController);
    expect(controller).toBeDefined();
  });
});
