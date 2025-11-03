import { Controller, Get, Post, Patch, Delete, Query, Body, UseGuards } from '@nestjs/common';
import { ClassPresidentService } from './class-president.service';
import { CreateClassPresidentDto } from './dto/create-class.dto';
import { UpdateClassPresidentDto } from './dto/update-class.dto';
import { TeacherGuard } from '../Teacher';
@UseGuards(TeacherGuard)
@Controller('apivoteclass-president')
export class ClassPresidentController {
  constructor(private readonly service: ClassPresidentService) {}

  @Post() // 후보 추가
  async create(@Body() dto: CreateClassPresidentDto) {
    await this.service.addPresident(dto);
    return { success: true };
  }

  @Get() // 후보 리스트 조회
  async list(
    @Query('year') year: number,
    @Query('semester') semester: number,
    @Query('grade') grade: number,
    @Query('class') classNum: number,
  ) {
    const list = await this.service.getPresidents(Number(year), Number(semester), Number(grade), Number(classNum));
    return { list };
  }

  @Patch() // 후보 수정
  async update(@Query('id') id: string, @Body() dto: UpdateClassPresidentDto) {
    await this.service.updatePresident(id, dto);
    return { success: true };
  }

  @Delete() // 후보 삭제
  async remove(@Query('number') num: string) {
    await this.service.deletePresident(num);
    return { success: true };
  }
}