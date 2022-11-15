export namespace FindAllResponse {
  export class Position {
    id: number;
    name: string;

    constructor(props: Position) {
      this.id = props.id;
      this.name = props.name;
    }
  }
}
