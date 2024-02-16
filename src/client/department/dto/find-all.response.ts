export namespace FindAllResponse {
  export class Department {
    id: number
    name: string

    constructor(props: Department) {
      this.id = props.id
      this.name = props.name
    }
  }
}
