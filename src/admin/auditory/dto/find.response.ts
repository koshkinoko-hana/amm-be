export namespace FindResponse {
    export class Auditory {
        id: number
        name: string
        size?: number
        type?: string

        constructor(props: Auditory) {
            this.id = props.id
            this.name = props.name
            this.size = props.size
            this.type = props.type
            
        }

    }
}