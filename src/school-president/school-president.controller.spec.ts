import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPresidentController } from './school-president.controller';

describe('SchoolPresidentController', () => {
  let controller: SchoolPresidentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolPresidentController],
    }).compile();

    controller = module.get<SchoolPresidentController>(SchoolPresidentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
