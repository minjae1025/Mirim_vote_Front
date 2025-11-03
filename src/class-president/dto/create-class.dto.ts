import { IsNumber, IsString } from 'class-validator';
export class CreateClassPresidentDto {
   @IsNumber()
  year: number;

  @IsNumber()
  semester: number;

  @IsNumber()
  grade: number;

  @IsNumber()
  classNum: number; 

  @IsString()
  name: string;
}