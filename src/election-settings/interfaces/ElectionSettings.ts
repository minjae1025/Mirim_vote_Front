export interface ElectionSettings {
  id?: string;               // 문서 id (optional)
  electionId: string;        // 고유 식별자 (예: "school-2025", "class-2025-1-3-2")
  active: boolean;           // 투표 진행중인지 여부 (on/off)
  voterCount: number;        // 유권자 수
  autoClose: boolean;        // 자동 종료 사용 여부
  createdAt?: string;
  updatedAt?: string;
}   