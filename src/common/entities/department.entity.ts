import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'
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

  @ManyToMany(() => Employee, (d) => d.departments, { owner: true })
  employees: Collection<Employee> = new Collection<Employee>(this)

  constructor(props: Omit<Department, keyof Auditable | 'employees'>) {
    super()
    this.name = props.name
    this.description = props.description
    this.competencies = props.competencies
  }
}
