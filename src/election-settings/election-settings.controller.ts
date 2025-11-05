import { Controller, Post, Body, Get, Query, Patch, Param, NotFoundException } from '@nestjs/common';
import { ElectionSettingsService } from './election-settings.service';
import { CreateElectionSettingsDto } from './dto/create-election-settingdto';
import { UpdateElectionSettingsDto } from './dto/update-election-settingdto';

@Controller('settings')
export class ElectionSettingsController {
  constructor(private readonly service: ElectionSettingsService) {}

  @Post()
  async createOrSet(@Body() dto: CreateElectionSettingsDto) {
    await this.service.setSettings(dto);
    return { ok: true };
  }

  @Get()
  async get(@Query('electionId') electionId: string) {
    if (!electionId) return { ok: false, message: 'electionId required' };
    const settings = await this.service.getSettings(electionId);
    if (!settings) throw new NotFoundException('settings not found');
    return { ok: true, settings };
  }

  @Patch(':electionId')
  async update(@Param('electionId') electionId: string, @Body() dto: UpdateElectionSettingsDto) {
    const existing = await this.service.getSettings(electionId);
    if (!existing) throw new NotFoundException('settings not found');
    await this.service.updateSettings(electionId, dto);
    return { ok: true };
  }
}