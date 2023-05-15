export namespace FindResponse {
  export class News {
    slug: string
    name: string
    description?: string
    article?: string
    createdAt: Date
    photoPath?: string
    photoAlt?: string

    constructor(props: News) {
      this.slug = props.slug
      this.name = props.name
      this.description = props.description
      this.article = props.article
      this.createdAt = props.createdAt
      this.photoPath = props.photoPath
      this.photoAlt = props.photoAlt
    }
  }
}
