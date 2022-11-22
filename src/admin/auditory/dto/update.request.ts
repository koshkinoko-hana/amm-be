import {IsString, IsNumber, IsEnum} from "class-validator";
import {Auditory as AuditoryEntity} from "@entities";

export namespace UpdateRequest {
    export class Auditory {
        @IsString()
        name!: string
        @IsNumber()
        size!: number
        @IsEnum(AuditoryEntity.Type)
        type!: AuditoryEntity.Type

    }
}