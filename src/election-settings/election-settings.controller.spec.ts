import { Test, TestingModule } from '@nestjs/testing';
import { ElectionSettingsController } from './election-settings.controller';

describe('ElectionSettingsController', () => {
  let controller: ElectionSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionSettingsController],
    }).compile();

    controller = module.get<ElectionSettingsController>(ElectionSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
