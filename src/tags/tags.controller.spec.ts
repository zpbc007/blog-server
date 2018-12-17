import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';

describe('Tags Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TagsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TagsController = module.get<TagsController>(TagsController);
    expect(controller).toBeDefined();
  });
});
