export interface SchoolPresidentCandidate {
  id?: string;      // firestore 문서 id. 응답에서 후보 number로 사용
  year: number;
  name1: string;
  name2: string;
  count?: number;   // 개표결과(집계)용
}
