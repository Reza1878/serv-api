import {
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsString,
  ArrayMinSize,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  biography: string;

  @IsString()
  @ValidateIf((object, value) => value)
  avatar: string | null;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  experiences: string[];
}
