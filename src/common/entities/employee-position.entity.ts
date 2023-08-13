import { Auditable } from './auditable.entity'
import { Department } from './department.entity'
import { Position } from './position.entity'
import { Employee } from './employee.entity'
import { ManyToOne } from '@mikro-orm/core'

export class EmployeeDepartmentPosition extends Auditable {
  @ManyToOne({ nullable: false })
  employee: Employee

  @ManyToOne({ nullable: false })
  position: Position

  @ManyToOne({ nullable: true })
  department?: Department

  constructor(props: Omit<EmployeeDepartmentPosition, keyof Auditable>) {
    super()
    this.employee = props.employee
    this.position = props.position
    this.department = props.department
  }
}
