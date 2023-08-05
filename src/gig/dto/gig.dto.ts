import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  Min,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class GigDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  sellerPerks: string[];

  @IsNumber()
  @Min(1)
  duration: number;

  @IsNumber()
  @Min(0)
  revisionLimit: number;

  @IsNumber()
  @Min(1)
  price: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  images: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  perks: string[];

  @IsString()
  note: string;

  @IsArray()
  @IsString({ each: true })
  taglines: string[];
}

export class GigQueryDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  searchValue: string;

  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  limit: number;

  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  start: number;
}
