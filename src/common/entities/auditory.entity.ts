import {Entity, Property} from "@mikro-orm/core";
import {Identified} from "./identified.entity";

@Entity()
export class Auditory extends Identified {
    @Property()
    name: string

    @Property()
    type?: Auditory.Type

    @Property()
    size?: number

    constructor(props: Omit<Auditory, keyof Identified>) {
        super()
        this.name = props.name
        this.type = props.type
        this.size = props.size
    }
}

export namespace Auditory {
    export enum Type {
        LAB = 'lab',
        SEMINAR = 'seminar',
        LECTURE = 'lecture'
    }
}