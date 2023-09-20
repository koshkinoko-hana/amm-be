import { Album } from './album.entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { Identified } from './identified.entity'

@Entity()
export class Photo extends Identified {
  @Property({ nullable: true })
  title?: string

  @Property()
  path: string

  @Property()
  type: Photo.PhotoType

  @Property()
  linkResource: Photo.LinkResource

  @Property()
  createdAt: Date = new Date()

  @ManyToOne(() => Album, { nullable: true })
  album?: Album

  constructor(props: Omit<Photo, keyof Identified | 'createdAt'>) {
    super()
    this.title = props.title
    this.path = props.path
    this.type = props.type
    this.linkResource = props.linkResource
    this.album = props.album
  }
}

export namespace Photo {
  export enum PhotoType {
    UserPhoto = 'user-photo',
    NewsImage = 'news-image',
    GalleryPhoto = 'gallery-photo',
  }

  export enum LinkResource {
    FIREBASE = 'firebase',
    EXTERNAL_LINK = 'external-link',
  }
}
