import { PaginationQuery } from '@common/dto'
import { Option } from '@common/dto/option'
import { PageInfo } from '@common/dto/page-info'
import { Position } from '@entities'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { FindAllRequest } from './dto/find-all.request'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { UpdateRequest } from './dto/update.request'

@Injectable()
export class PositionService {
  constructor(private readonly em: EntityManager) {}

  public async findAll(
    pagination: PaginationQuery,
    filters: FindAllRequest.FiltersQuery,
  ): Promise<[FindAllResponse.Position[], PageInfo]> {
    const [positions, total] = await this.em.findAndCount(
      Position,
      {
        ...(filters.name ? { name: { $like: `${filters.name}%` } } : {}),
      },
      {
        ...pagination,
      },
    )
    const res: [FindAllResponse.Position[], PageInfo] = [
      positions.map((pos: Position) => new FindAllResponse.Position(pos)),
      { total, ...pagination },
    ]
    return res
  }

  public async findOptions(): Promise<Option[]> {
    const positions = await this.em.find(Position, {})
    const res: Option[] = positions.map((item) => ({ label: item.name, value: item.id }))
    return res
  }

  public async find(id: number) {
    const position = await this.em.findOneOrFail(
      Position,
      {
        id,
      },
      {},
    )
    const res = new FindResponse.Position(position)
    return res
  }

  public async update(id: number, req: UpdateRequest.Position) {
    const position = await this.em.findOneOrFail(
      Position,
      {
        id,
      },
      {},
    )
    position.name = req.name
    await this.em.persistAndFlush(position)
    return position.id
  }
}
