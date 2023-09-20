import { Entity, Property } from '@mikro-orm/core'
import { Auditable } from './auditable.entity'

@Entity()
export class Company extends Auditable {
  @Property()
  name: string

  @Property({ type: 'text' })
  description: string

  constructor(props: Omit<Company, keyof Auditable>) {
    super()
    this.name = props.name
    this.description = props.description
  }
}
