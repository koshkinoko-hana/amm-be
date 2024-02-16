export namespace FindAllResponse {
  export class Direction {
    id: number
    number: string
    type: string
    name: string
    price: number
    exams: string[]

    constructor(props: Direction) {
      this.id = props.id
      this.number = props.number
      this.type = props.type
      this.name = props.name
      this.price = props.price
      this.exams = props.exams
    }
  }
}
