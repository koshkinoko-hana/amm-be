import { DepartmentPositionShort } from '@common/dto/department-position-short'

export namespace FindResponse {
  export class Employee {
    firstName: string
    middleName?: string
    lastName: string
    photoPath?: string
    description?: string
    departmentPositions: DepartmentPositionShort[]

    constructor(props: Employee) {
      this.firstName = props.firstName
      this.middleName = props.middleName
      this.lastName = props.lastName
      this.photoPath = props.photoPath
      this.description = props.description
      this.departmentPositions = props.departmentPositions
    }
  }
}
