import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPresidentService } from './school-president.service';

describe('SchoolPresidentService', () => {
  let service: SchoolPresidentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolPresidentService],
    }).compile();

    service = module.get<SchoolPresidentService>(SchoolPresidentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
