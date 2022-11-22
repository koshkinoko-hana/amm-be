import {Auditory} from "@entities"
export namespace FindAllResponse {
    export class Auditory {
        id: number
        name: string
        type?:  Auditory.Type
        size?: number

        constructor(props: Auditory) {
            this.id = props.id
            this.name = props.name
            this.type = props.type
            this.size = props.size
        }

    }
}