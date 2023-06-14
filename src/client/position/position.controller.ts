import { Option } from '@common/dto/option'
import { PaginationQuery } from '@common/dto/pagination.query'
import { PaginatedResponseWrapper } from '@common/dto/wrappers/paginated.response-wrapper'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { FindAllRequest } from './dto/find-all.request'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { PositionService } from './position.service'

@Controller('/position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  public async findAll(
    @Query() pagination: PaginationQuery,
    @Query() sorting: FindAllRequest.SortingQuery,
  ): Promise<PaginatedResponseWrapper<FindAllResponse.Position>> {
    const [positions, pageInfo] = await this.positionService.findAll(pagination, sorting)
    const res = new PaginatedResponseWrapper(positions, pageInfo)
    return res
  }

  @Get('/options')
  public async findOptions(): Promise<Option[]> {
    const res = await this.positionService.findOptions()
    return res
  }

  @Get(':id')
  public async find(@Param('id') id: number): Promise<FindResponse.Position> {
    const res = await this.positionService.find(id)
    return res
  }
}
