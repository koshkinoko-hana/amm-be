import { PrimaryKey } from '@mikro-orm/core'

export class Identified {
  @PrimaryKey()
  id!: number
}
