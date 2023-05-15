import { Entity, Property } from '@mikro-orm/core'
import { Identified } from './identified.entity'

@Entity()
export class Photo extends Identified {
  @Property()
  title?: string

  @Property()
  path: string

  @Property()
  type: Photo.PhotoType

  constructor(props: Omit<Photo, keyof Identified>) {
    super()
    this.title = props.title
    this.path = props.path
    this.type = props.type
  }
}

export namespace Photo {
  export enum PhotoType {
    UserPhoto = 'user-photo',
  }
}
