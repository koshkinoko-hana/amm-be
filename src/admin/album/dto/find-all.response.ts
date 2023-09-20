export namespace FindAllResponse {
  export class Album {
    id: number
    name: string
    date: Date

    constructor(props: Album) {
      this.id = props.id
      this.name = props.name
      this.date = props.date
    }
  }
}
