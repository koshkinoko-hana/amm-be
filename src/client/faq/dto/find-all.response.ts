export namespace FindAllResponse {
  export class Faq {
    id: number
    firstName: string
    middleName?: string
    lastName: string
    email: string
    question: string
    answer: string
    respondent: string
    createdAt?: Date
    updatedAt?: Date

    constructor(props: Faq) {
      this.id = props.id
      this.firstName = props.firstName
      this.middleName = props.middleName
      this.lastName = props.lastName
      this.email = props.email
      this.question = props.question
      this.answer = props.answer
      this.respondent = props.respondent
      this.createdAt = props.createdAt
      this.updatedAt = props.updatedAt
    }
  }
}
