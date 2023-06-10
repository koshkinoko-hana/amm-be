export namespace FindResponse {
  export class GalleryPhoto {
    id: number
    title?: string
    path: string
    constructor(props: GalleryPhoto) {
      this.id = props.id
      this.title = props.title
      this.path = props.path
    }
  }
}
