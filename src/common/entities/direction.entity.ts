import { Entity, Property } from '@mikro-orm/core'
import { Identified } from './identified.entity'

@Entity()
export class Direction extends Identified {
  @Property()
  number: string

  @Property()
  type: Direction.Type

  @Property()
  name: string

  @Property({ type: 'json' })
  features: string[]

  @Property({ type: 'json' })
  profiles: string[]

  @Property({ type: 'json' })
  forms: string[]

  @Property()
  price: number

  @Property({ type: 'json' })
  exams: string[]

  constructor(props: Omit<Direction, keyof Identified>) {
    super()
    this.number = props.number
    this.type = props.type
    this.name = props.name
    this.features = props.features
    this.profiles = props.profiles
    this.forms = props.forms
    this.price = props.price
    this.exams = props.exams
  }
}

export namespace Direction {
  export enum Type {
    UNDERGRADUATE = 'Бакалавриат',
    MAGISTRACY = 'Магистратура',
    MILITARY = 'Учебный военный центр',
  }
}
