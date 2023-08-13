import { EmployeeDepartmentPosition } from '@common/entities/employee-position.entity'
import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core'
import { Auditable } from './auditable.entity'
import { Employee } from './employee.entity'

@Entity()
export class Department extends Auditable {
  @Property()
  name: string

  @Property({ nullable: true, type: 'text' })
  description?: string

  @Property({ type: 'json' })
  competencies: string[]

  @OneToMany(() => EmployeeDepartmentPosition, (ep) => ep.department)
  employeesWithPositions: Collection<EmployeeDepartmentPosition> =
    new Collection<EmployeeDepartmentPosition>(this)

  @ManyToOne(() => Employee)
  head: Employee

  constructor(props: Omit<Department, keyof Auditable | 'employeesWithPositions'>) {
    super()
    this.name = props.name
    this.description = props.description
    this.head = props.head
    this.competencies = props.competencies
  }
}
