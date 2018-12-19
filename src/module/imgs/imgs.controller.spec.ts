import { Test, TestingModule } from '@nestjs/testing';
import { ImgsController } from './imgs.controller';

describe('Imgs Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ImgsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ImgsController = module.get<ImgsController>(ImgsController);
    expect(controller).toBeDefined();
  });
});
