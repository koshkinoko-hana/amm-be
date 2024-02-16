import { Auditable } from './auditable.entity'
import { Department } from './department.entity'
import { Position } from './position.entity'
import { Employee } from './employee.entity'
import { Entity, ManyToOne } from '@mikro-orm/core'

@Entity()
export class EmployeeDepartmentPosition extends Auditable {
  @ManyToOne(() => Employee, { nullable: false })
  employee: Employee

  @ManyToOne(() => Position, { nullable: false })
  position: Position

  @ManyToOne(() => Department, { nullable: true })
  department?: Department

  constructor(props: Omit<EmployeeDepartmentPosition, keyof Auditable>) {
    super()
    this.employee = props.employee
    this.position = props.position
    this.department = props.department
  }
}
