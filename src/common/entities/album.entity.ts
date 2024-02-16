import { Photo } from './photo.entity'
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { Auditable } from './auditable.entity'

@Entity()
export class Album extends Auditable {
  @Property()
  name: string

  @Property({ type: 'text', nullable: true })
  description?: string

  @Property()
  date: Date

  @OneToMany(() => Photo, (p) => p.album)
  photos: Collection<Photo> = new Collection<Photo>(this)

  constructor(props: Omit<Album, keyof Auditable | 'photos'>) {
    super()
    this.name = props.name
    this.description = props.description
    this.date = props.date
  }
}
