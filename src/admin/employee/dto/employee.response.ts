export class EmployeeResponse {
  id: number
  firstName: string
  middleName?: string
  lastName: string
  photoId?: number
  photoPath?: string
  positions: Position[]

  constructor(props: EmployeeResponse) {
    this.id = props.id
    this.firstName = props.firstName
    this.middleName = props.middleName
    this.lastName = props.lastName
    this.photoId = props.photoId
    this.photoPath = props.photoPath
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
