import { Test, TestingModule } from '@nestjs/testing';
import { ClassPresidentService } from './class-president.service';

describe('ClassPresidentService', () => {
  let service: ClassPresidentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassPresidentService],
    }).compile();

    service = module.get<ClassPresidentService>(ClassPresidentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
