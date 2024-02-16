import { EmployeeDepartmentPosition } from './employee-department-position.entity'
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Identified } from './identified.entity'

@Entity()
export class Position extends Identified {
  @Property()
  name: string

  @OneToMany(() => EmployeeDepartmentPosition, (e) => e.position)
  employeeDepartmentPositions: Collection<EmployeeDepartmentPosition> =
    new Collection<EmployeeDepartmentPosition>(this)

  constructor(props: Omit<Position, keyof Identified | 'employeeDepartmentPositions'>) {
    super()
    this.name = props.name
  }
}
