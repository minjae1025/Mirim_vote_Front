import { Module } from '@nestjs/common';
import { ElectionSettingsService } from './election-settings.service';
import { ElectionSettingsController } from './election-settings.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [ElectionSettingsController],
  providers: [ElectionSettingsService],
  exports: [ElectionSettingsService],
})
export class ElectionSettingsModule {}