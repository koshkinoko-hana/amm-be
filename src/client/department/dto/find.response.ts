export namespace FindResponse {
  export class Department {
    id: number
    name: string
    description?: string
    competencies: string[]
    head: Employee
    employees: DepartmentEmployee[]
    address: string
    phones: string[]
    email: string

    constructor(props: Department) {
      this.id = props.id
      this.name = props.name
      this.description = props.description
      this.competencies = props.competencies
      this.head = props.head
      this.employees = props.employees
      this.address = props.address
      this.phones = props.phones
      this.email = props.email
    }
  }

  export interface Employee {
    id: number
    firstName: string
    middleName?: string
    lastName: string
    photoPath?: string
  }

  export interface DepartmentEmployee {
    id: number
    firstName: string
    middleName?: string
    lastName: string
    photoPath?: string
    positions: string[]
  }
}
