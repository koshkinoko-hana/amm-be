import { EmployeeDepartmentPosition } from './employee-position.entity'
import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'
import { Identified } from './identified.entity'

@Entity()
export class Position extends Identified {
  @Property()
  name: string

  @ManyToMany(() => EmployeeDepartmentPosition, (e) => e.position)
  employeeDepartmentPositions: Collection<EmployeeDepartmentPosition> =
    new Collection<EmployeeDepartmentPosition>(this)

  constructor(props: Omit<Position, keyof Identified | 'employeeDepartmentPositions'>) {
    super()
    this.name = props.name
  }
}
