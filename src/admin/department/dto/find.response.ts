import { EmployeeShort, EmployeePositionShort } from '@common/dto/employee-short'

export namespace FindResponse {
  export class Department {
    id: number
    name: string
    head: EmployeeShort
    description?: string
    competencies: string[]
    employees: EmployeePositionShort[]
    address: string
    phones: string[]
    email: string

    constructor(props: Department) {
      this.id = props.id
      this.name = props.name
      this.head = props.head
      this.description = props.description
      this.competencies = props.competencies
      this.employees = props.employees
      this.address = props.address
      this.email = props.email
      this.phones = props.phones
    }
  }
}
