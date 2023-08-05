import { IsNumber, IsString, Max, Min } from 'class-validator';

export class GigReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  review: string;
}
