import { Test, TestingModule } from '@nestjs/testing';
import { ElectionSettingsService } from './election-settings.service';

describe('ElectionSettingsService', () => {
  let service: ElectionSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectionSettingsService],
    }).compile();

    service = module.get<ElectionSettingsService>(ElectionSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
