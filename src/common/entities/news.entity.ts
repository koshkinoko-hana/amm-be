import { Photo } from './photo.entity'
import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class News {
  @PrimaryKey()
  slug: string

  @Property()
  name: string

  @Property({ nullable: true })
  description?: string

  @Property({ nullable: true, type: 'text' })
  article?: string

  @OneToOne({ nullable: true })
  photo?: Photo

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()

  constructor(props: Omit<News, 'createdAt' | 'updatedAt'>) {
    this.slug = props.slug
    this.name = props.name
    this.description = props.description
    this.article = props.article
    this.photo = props.photo
  }
}
