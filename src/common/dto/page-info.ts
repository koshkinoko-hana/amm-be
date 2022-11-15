export class PageInfo {
  constructor(
    readonly total: number,
    readonly offset: number,
    readonly limit: number,
  ) {}
}
