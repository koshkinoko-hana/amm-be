import { EmployeeShort } from '@common/dto/employee-short'

export class DepartmentResponse {
  name: string
  description?: string
  head: EmployeeShort
  competencies: string[]

  constructor(props: DepartmentResponse) {
    this.name = props.name
    this.description = props.description
    this.head = props.head
    this.competencies = props.competencies
  }
}
