import {Entity, Property} from "@mikro-orm/core";
import {Auditable} from "./auditable.entity";

@Entity()
export class Department extends Auditable {
    @Property()
    name: string

    @Property()
    description?: string

    @Property({type: 'json'})
    competencies: string[]

    constructor(props: Omit<Department, keyof Auditable>) {
        super()
        this.name = props.name
        this.description = props.description
        this.competencies = props.competencies
    }
}