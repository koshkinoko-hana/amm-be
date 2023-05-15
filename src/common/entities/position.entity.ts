import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'
import { Identified } from './identified.entity'
import { Employee } from './employee.entity'

@Entity()
export class Position extends Identified {
  @Property()
  name: string

  @ManyToMany(() => Employee, (e) => e.positions)
  employees: Collection<Employee> = new Collection<Employee>(this)

  constructor(props: Omit<Position, keyof Identified | 'users' | 'employees'>) {
    super()
    this.name = props.name
  }
}
