import { IsNumber, IsString } from 'class-validator';
export class CreateSchoolPresidentDto {
   @IsNumber()
  year: number;

  @IsString() 
  name1: string;

  @IsString()
  name2: string;
}