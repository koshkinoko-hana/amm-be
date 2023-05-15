import { Option } from '@common/dto/option'

export namespace FindResponse {
  export class Employee {
    firstName: string
    middleName?: string
    lastName: string
    photo?: string
    description?: string
    positions: Option[]
    departments: Option[]

    constructor(props: Employee) {
      this.firstName = props.firstName
      this.middleName = props.middleName
      this.lastName = props.lastName
      this.photo = props.photo
      this.description = props.description
      this.positions = props.positions
      this.departments = props.departments
    }
  }
}
