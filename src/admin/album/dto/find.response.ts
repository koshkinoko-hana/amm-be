export namespace FindResponse {
  export class Album {
    id: number
    name: string
    date: Date
    photos: Photo[]

    constructor(props: Album) {
      this.id = props.id
      this.name = props.name
      this.date = props.date
      this.photos = props.photos
    }
  }

  export interface Photo {
    id: number
    path: string
  }
}
