import {IsString} from "class-validator";

export namespace CreateRequest {
    export class Auditory {
        @IsString()
        name!: string
    }
}