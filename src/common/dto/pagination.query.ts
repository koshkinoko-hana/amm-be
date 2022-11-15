import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQuery {
  @Transform((id) => parseInt(id, 10))
  @IsOptional()
  @Min(0)
  @IsInt()
  readonly offset: number = 0;

  @Transform((id) => parseInt(id, 10))
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly limit: number = 50;
}
