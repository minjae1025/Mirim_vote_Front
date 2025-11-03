import { Module } from '@nestjs/common';
import { SchoolPresidentController } from './school-president.controller';
import { SchoolPresidentService } from './school-president.service';
import {FirebaseModule} from "../firebase/firebase.module";

@Module({
    imports: [FirebaseModule], // 
    controllers: [SchoolPresidentController],//
    providers: [SchoolPresidentService],
})
export class SchoolPresidentModule {}
