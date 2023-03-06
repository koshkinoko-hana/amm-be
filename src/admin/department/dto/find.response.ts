export namespace FindResponse {
  export class Department {
    id: number
    name: string
    description?: string
    competencies: string[]

    constructor(props: Department) {
      this.id = props.id
      this.name = props.name
      this.competencies = props.competencies
    }
  }
}
