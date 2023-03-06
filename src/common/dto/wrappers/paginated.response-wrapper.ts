import { PageInfo } from '../page-info'

export class PaginatedResponseWrapper<T> {
  readonly data: T[]
  readonly total: number
  readonly offset: number
  readonly limit: number

  constructor(data: T[], pageInfo: PageInfo) {
    this.data = data
    this.total = pageInfo.total
    this.offset = pageInfo.offset
    this.limit = pageInfo.limit
  }
}
