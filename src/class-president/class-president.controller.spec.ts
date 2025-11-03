import { Test, TestingModule } from '@nestjs/testing';
import { ClassPresidentController } from './class-president.controller';

describe('ClassPresidentController', () => {
  let controller: ClassPresidentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassPresidentController],
    }).compile();

    controller = module.get<ClassPresidentController>(ClassPresidentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
