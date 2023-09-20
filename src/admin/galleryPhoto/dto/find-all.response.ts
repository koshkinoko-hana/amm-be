export namespace FindAllResponse {
  export class GalleryPhoto {
    id: number
    path: string
    albumId?: number
    album?: string

    constructor(props: GalleryPhoto) {
      this.id = props.id
      this.albumId = props.albumId
      this.album = props.album
      this.path = props.path
    }
  }
}
