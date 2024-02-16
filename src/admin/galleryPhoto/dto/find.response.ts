export namespace FindResponse {
  export class GalleryPhoto {
    id: number
    title?: string
    path: string
    albumId?: number

    constructor(props: GalleryPhoto) {
      this.id = props.id
      this.title = props.title
      this.path = props.path
      this.albumId = props.albumId
    }
  }
}
