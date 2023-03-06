export namespace FindAllResponse {
  export class Employee {
    id: number
    name: string
    positions: Position[]

    constructor(props: Employee) {
      this.id = props.id
      this.name = props.name
      this.positions = props.positions
    }
  }

  export class Position {
    id: number
    name: string

    constructor(props: Position) {
      this.id = props.id
      this.name = props.name
    }
  }
}
