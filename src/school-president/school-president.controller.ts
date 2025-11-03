// school-president.controller.ts

import { Controller, Post, Get, Patch, Delete, Body, Query } from '@nestjs/common';
import { SchoolPresidentService } from './school-president.service';
import { CreateSchoolPresidentDto } from './dto/create-school.dto';
import { UpdateSchoolPresidentDto } from './dto/update-school.dto';

@Controller('apivoteschool-president')
export class SchoolPresidentController {
  constructor(private readonly schoolPresidentService: SchoolPresidentService) {}

  // 후보 추가
  @Post()
  async create(@Body() createDto: CreateSchoolPresidentDto) {
    await this.schoolPresidentService.addPresident(createDto);
    return { success: true };
  }

  // 후보 리스트 조회
  @Get()
  async list(@Query('year') year: number) {
    return await this.schoolPresidentService.getPresidents(Number(year));
  }

  // 개표 결과 조회 (count 포함)
  @Get('result')
  async result(@Query('year') year: number) {
    return await this.schoolPresidentService.getResults(Number(year));
  }

  // 후보 수정
  @Patch()
  async update(
    @Query('number') number: string,  
    @Body() updateDto: UpdateSchoolPresidentDto,
  ) {
    await this.schoolPresidentService.updatePresident(number, updateDto);
    return { success: true };
  }

  // 후보 삭제
  @Delete()
  async remove(@Query('number') number: string) {
    await this.schoolPresidentService.deletePresident(number);
    return { success: true };
  }
}
