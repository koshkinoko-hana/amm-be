import { IsOptional, IsString } from 'class-validator'
import {QueryOrder} from "@mikro-orm/core/enums";

export namespace FindAllRequest {

  export type SortingQuery = {
    id?: QueryOrder;
    name?: QueryOrder;
  };

  export class FiltersQuery {
    @IsOptional()
    @IsString()
    readonly name?: string
  }
}
