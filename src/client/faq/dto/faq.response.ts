export class FaqResponse {
  id: number
  firstName: string
  middleName?: string
  lastName: string
  email: string
  question: string
  answer: string
  respondent?: string

  constructor(props: FaqResponse) {
    this.id = props.id
    this.firstName = props.firstName
    this.middleName = props.middleName
    this.lastName = props.lastName
    this.question = props.question
    this.email = props.email
    this.answer = props.answer
    this.respondent = props.respondent
  }
}
