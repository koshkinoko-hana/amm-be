export class ResponseWrapper<T> {
  readonly data: T

  constructor(data: T) {
    this.data = data
  }
}
