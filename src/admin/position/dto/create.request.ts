import { IsString } from 'class-validator';

export namespace CreateRequest {
  export class Position {
    @IsString()
    name!: string;
  }
}
