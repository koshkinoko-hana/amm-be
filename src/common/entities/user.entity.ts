import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Auditable } from './auditable.entity';
import { Position } from './position.entity';

@Entity()
export class User extends Auditable {
  @Property()
  firstName: string;

  @Property()
  middleName?: string;

  @Property()
  lastName: string;

  @Property({ nullable: true })
  photo: string;

  @ManyToMany(() => Position, (position) => position.users, { owner: true })
  positions: Collection<Position> = new Collection<Position>(this);

  constructor(props: Omit<User, keyof Auditable>) {
    super();
    this.firstName = props.firstName;
    this.middleName = props.middleName;
    this.lastName = props.lastName;
    this.photo = props.photo;
    this.positions = props.positions;
  }
}
