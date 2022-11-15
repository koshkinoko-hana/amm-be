import { QueryOrder } from '@mikro-orm/core/enums';
import { IsOptional, IsString } from 'class-validator';

export namespace FindAllRequest {
  export type SortingQuery = {
    id?: QueryOrder;
    name?: QueryOrder;
  };

  export class FiltersQuery {
    @IsOptional()
    @IsString()
    readonly name?: string;
  }
}
