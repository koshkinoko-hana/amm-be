import { Entity, Property } from '@mikro-orm/core'
import { Auditable } from './auditable.entity'

@Entity()
export class Faq extends Auditable {
  @Property()
  firstName: string

  @Property()
  middleName?: string

  @Property()
  lastName: string

  @Property()
  email: string

  @Property()
  question!: string

  @Property({ nullable: true })
  answer!: string

  @Property({ nullable: true })
  respondent!: string

  constructor(props: Omit<Faq, keyof Auditable>) {
    super()
    this.firstName = props.firstName
    this.middleName = props.middleName
    this.lastName = props.lastName
    this.email = props.email
    this.question = props.question
    this.answer = props.answer
    this.respondent = props.respondent
  }
}
