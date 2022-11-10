import {Collection, Entity, ManyToMany, Property} from "@mikro-orm/core";
import {User} from "./user.entity";
import {Identified} from "./identified.entity";

@Entity()
export class Position extends Identified {

    @Property()
    name: string

    @ManyToMany(() => User, user => user.positions)
    users: Collection<User> = new Collection<User>(this)

    constructor(props: Omit<Position, keyof Identified | 'users'>) {
        super()
        this.name = props.name
    }
}