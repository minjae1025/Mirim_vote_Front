import { IsString } from "class-validator";

export class UpdateClassPresidentDto {
  @IsString()
  name?: string;
}