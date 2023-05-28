export namespace FindAllResponse {
  export class News {
    slug: string
    name: string
    description?: string
    createdAt: Date
    photoPath?: string
    photoAlt?: string

    constructor(props: News) {
      this.slug = props.slug
      this.name = props.name
      this.description = props.description
      this.createdAt = props.createdAt
      this.photoPath = props.photoPath
      this.photoAlt = props.photoAlt
    }
  }
}
