import { PageInfo } from '../page-info'
import { ResponseWrapper } from './response-wrapper'

export class PaginatedResponseWrapper<T> extends ResponseWrapper<T[]> {
  readonly total: number
  readonly offset: number
  readonly limit: number

  constructor(data: T[], pageInfo: PageInfo) {
    super(data)
    this.total = pageInfo.total
    this.offset = pageInfo.offset
    this.limit = pageInfo.limit
  }
}
