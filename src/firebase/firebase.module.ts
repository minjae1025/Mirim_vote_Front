import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
@Module({
    providers: [FirebaseService],
    exports: [FirebaseService], //다른 모듈에서 이 서비스를 사용할 수 있게 해줌
})
export class FirebaseModule {}
