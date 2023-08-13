export namespace FindAllResponse {
  export class Employee {
    id: number
    firstName: string
    middleName?: string
    lastName: string
    photoPath?: string
    departmentPosition

    constructor(props: Employee) {
      this.id = props.id
      this.firstName = props.firstName
      this.middleName = props.middleName
      this.lastName = props.lastName
      this.photoPath = props.photoPath
      this.positions = props.positions
      this.departments = props.departments
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

  export class Department {
    id: number
    name: string

    constructor(props: Department) {
      this.id = props.id
      this.name = props.name
    }
  }
}
