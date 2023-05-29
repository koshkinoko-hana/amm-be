export namespace FindAllResponse {
  export class GalleryPhoto {
    id: number
    title?: string
    createdAt: Date
    path: string
    constructor(props: GalleryPhoto) {
      this.id = props.id
      this.title = props.title
      this.createdAt = props.createdAt
      this.path = props.path
    }
  }
}
