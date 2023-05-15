export class UploadedFileResponse {
  id: number
  path: string
  title?: string

  constructor(props: UploadedFileResponse) {
    this.id = props.id
    this.path = props.path
    this.title = props.title
  }
}
