import { IsString } from 'class-validator';
export class UpdateSchoolPresidentDto {
@IsString()
  name1?: string;

  @IsString()
  name2?: string;
}