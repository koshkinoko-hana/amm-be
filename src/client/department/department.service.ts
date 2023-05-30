import { Option } from '@common/dto/option'
import { Department } from '@entities'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { UpdateRequest } from './dto/update.request'
import { FindResponse } from './dto/find.response'

@Injectable()
export class DepartmentService {
  constructor(private readonly em: EntityManager) {}

  public async findAll(): Promise<FindAllResponse.Department[]> {
    const departments = await this.em.find(Department, {})
    const res: FindAllResponse.Department[] = departments.map(
      (d: Department) => new FindAllResponse.Department(d),
    )
    return res
  }

  public async findOptions(): Promise<Option[]> {
    const departments = await this.em.find(Department, {})
    const res: Option[] = departments.map((item) => ({ label: item.name, value: item.id }))
    return res
  }

  public async find(id: number) {
    const department = await this.em.findOneOrFail(
      Department,
      {
        id,
      },
      {},
    )
    const res = new FindResponse.Department(department)
    return res
  }
  public async update(id: number, req: UpdateRequest.Department) {
    const department = await this.em.findOneOrFail(
      Department,
      {
        id,
      },
      {},
    )
    department.name = req.name
    department.description = req.description
    department.competencies = req.competencies
    await this.em.persistAndFlush(department)

    return department
  }
}
