import { DepartmentPositionShort } from '@common/dto/department-position-short'

export class EmployeeResponse {
  id: number
  firstName: string
  middleName?: string
  lastName: string
  departmentPositions: DepartmentPositionShort[]
  photoPath?: string
  description?: string

  constructor(props: EmployeeResponse) {
    this.id = props.id
    this.firstName = props.firstName
    this.middleName = props.middleName
    this.lastName = props.lastName
    this.departmentPositions = props.departmentPositions
    this.photoPath = props.photoPath
    this.description = props.description
  }
}
