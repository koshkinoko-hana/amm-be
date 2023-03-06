export namespace FindAllResponse {
  export class Department {
    id: number
    name: string
    description?: string
    competencies: string[]

    constructor(props: Department) {
      this.id = props.id
      this.name = props.name
      this.description = props.description
      this.competencies = props.competencies
    }
  }
}
