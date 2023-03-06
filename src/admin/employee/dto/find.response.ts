export namespace FindResponse {
  export class Employee {
    firstName: string
    middleName?: string
    lastName: string
    photo?: string
    positions: Position[]

    constructor(props: Employee) {
      this.firstName = props.firstName
      this.middleName = props.middleName
      this.lastName = props.lastName
      this.photo = props.photo
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
