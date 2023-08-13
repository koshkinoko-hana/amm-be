import { EmployeeDepartmentPosition } from '@common/entities/employee-position.entity'
import { Photo } from './photo.entity'
import { Collection, Entity, OneToMany, OneToOne, Property } from '@mikro-orm/core'
import { Auditable } from './auditable.entity'

@Entity()
export class Employee extends Auditable {
  @Property()
  firstName: string

  @Property()
  middleName?: string

  @Property()
  lastName: string

  @Property()
  photoId?: number

  @OneToOne({ nullable: true })
  photo?: Photo

  @Property({ nullable: true })
  description?: string

  @Property({ nullable: true })
  worksSince?: number

  @OneToMany(() => EmployeeDepartmentPosition, (position) => position.employee)
  employeeDepartmentPositions: Collection<EmployeeDepartmentPosition> =
    new Collection<EmployeeDepartmentPosition>(this)

  constructor(props: Omit<Employee, keyof Auditable | 'employeeDepartmentPositions'>) {
    super()
    this.firstName = props.firstName
    this.middleName = props.middleName
    this.lastName = props.lastName
    this.photo = props.photo
    this.description = props.description
    this.worksSince = props.worksSince
    this.photoId = props.photoId
  }
}
