import { Module } from '@nestjs/common';
import { ClassPresidentController } from './class-president.controller';
import { ClassPresidentService } from './class-president.service';
import {FirebaseModule} from "../firebase/firebase.module";
@Module({
  
  imports: [FirebaseModule],
  controllers: [ClassPresidentController],
  providers: [ClassPresidentService],
})
export class ClassPresidentModule {}
