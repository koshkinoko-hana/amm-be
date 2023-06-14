export namespace FindByDepartmentResponse {
  export class Employee {
    id: number
    firstName: string
    middleName?: string
    lastName: string
    photoPath?: string
    description?: string
    positions: Position[]
    departments: Department[]

    constructor(props: Employee) {
      this.id = props.id
      this.firstName = props.firstName
      this.middleName = props.middleName
      this.lastName = props.lastName
      this.photoPath = props.photoPath
      this.description = props.description
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
