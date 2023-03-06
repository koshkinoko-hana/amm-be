import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { Auditable } from './auditable.entity'
import { Company } from './company.entity'

@Entity()
export class User extends Auditable {
  @Property()
  login: string

  @Property()
  passwordHash: string

  @Property({ nullable: true })
  fullName?: string

  @Property({ type: 'array' })
  roles: User.Role[]

  @Property()
  status: User.Status

  @ManyToOne({ nullable: true })
  company?: Company

  constructor(props: Omit<User, keyof Auditable>) {
    super()
    this.login = props.login
    this.passwordHash = props.passwordHash
    this.roles = props.roles
    this.status = props.status
  }
}

export namespace User {
  export enum Role {
    ADMIN = 'admin',
    NEWS_MODERATOR = 'news_moderator',
    SCHEDULE_MODERATOR = 'schedule_moderator',
    CONTENT_MODERATOR = 'content_moderator',
    COMPANY_MODERATOR = 'company_moderator',
    STRUCTURE_DATA_MODERATOR = 'structure_data_moderator',
    AUTHENTICATED = 'authenticated',
  }

  export enum Status {
    PENDING = 'pending',
    ACTIVE = 'active',
    DEACTIVATED = 'deactivated',
  }
}
