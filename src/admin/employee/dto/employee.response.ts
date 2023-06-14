export class EmployeeResponse {
  id: number
  firstName: string
  middleName?: string
  lastName: string
  positions: Position[]
  departments: Department[]
  photoId?: number
  photoPath?: string

  constructor(props: EmployeeResponse) {
    this.id = props.id
    this.firstName = props.firstName
    this.middleName = props.middleName
    this.lastName = props.lastName
    this.positions = props.positions
    this.departments = props.departments
    this.photoId = props.photoId
    this.photoPath = props.photoPath
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
