import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateElectionSettingsDto } from './dto/create-election-settingdto';
import { UpdateElectionSettingsDto } from './dto/update-election-settingdto';
import { ElectionSettings } from './interfaces/ElectionSettings';

@Injectable()
export class ElectionSettingsService {
  constructor(private readonly firebase: FirebaseService) {}

  private collection() {
    return this.firebase.db.collection('election-settings');
  }

  async setSettings(dto: CreateElectionSettingsDto): Promise<void> {
    await this.collection().doc(dto.electionId).set({
      electionId: dto.electionId,
      active: dto.active,
      voterCount: dto.voterCount,
      autoClose: dto.autoClose,
    }, { merge: true });
  }

  async getSettings(electionId: string): Promise<ElectionSettings | null> {
    const snap = await this.collection().doc(electionId).get();
    if (!snap.exists) return null;
    return { id: snap.id, ...(snap.data() as ElectionSettings) };
  }

  async updateSettings(electionId: string, update: UpdateElectionSettingsDto): Promise<void> {
    await this.collection().doc(electionId).update({
      ...update,
    });
  }

  // 시간 기반 자동종료 로직 제거: 서비스 내부에서 시간 저장/처리하지 않음
  async processAutoClose(): Promise<string[]> {
    return [];
  }
}