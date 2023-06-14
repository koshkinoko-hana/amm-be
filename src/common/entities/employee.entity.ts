import { Photo } from './photo.entity'
import { Collection, Entity, ManyToMany, OneToOne, Property } from '@mikro-orm/core'
import { Auditable } from './auditable.entity'
import { Position } from './position.entity'
import { Department } from './department.entity'

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

  @ManyToMany(() => Position, (position) => position.employees, { owner: true })
  positions: Collection<Position> = new Collection<Position>(this)

  @ManyToMany(() => Department, (d) => d.employees)
  departments: Collection<Department> = new Collection<Department>(this)

  constructor(props: Omit<Employee, keyof Auditable | 'positions' | 'departments'>) {
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
