import { Option } from '@common/dto/option'
import { conflictHandler, failIfExists, notFoundHandler } from '@common/utils/fail-handler'
import { Department, Employee } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import {
  mapEmployeeToEmployeeShort,
  mapEmployeeDepartmentPositionToEmployeeShortWithPosition,
} from '@utils'
import { CreateRequest } from './dto/create.request'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { UpdateRequest } from './dto/update.request'

@Injectable()
export class DepartmentService {
  constructor(
    @InjectLogger(DepartmentService)
    private readonly logger: Logger,
    private readonly em: EntityManager,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findAll(): Promise<FindAllResponse.Department[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const departments = await this.em.find(Department, {})
    logger.trace({ departments })
    const res: FindAllResponse.Department[] = departments.map(
      (d: Department) => new FindAllResponse.Department(d),
    )

    logger.trace({ res })
    return res
  }

  public async findOptions(): Promise<Option[]> {
    const logger = this.logger.child('findOptions')
    logger.trace('>')
    const departments = await this.em.find(Department, {})
    logger.trace({ departments })
    const res: Option[] = departments.map((item) => ({ label: item.name, value: item.id }))
    logger.trace({ res })
    return res
  }

  public async find(id: number) {
    const logger = this.logger.child('find')
    logger.trace('>')
    const department = await this.em.findOneOrFail(
      Department,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
        populate: [
          'employeesWithPositions',
          'employeesWithPositions.employee',
          'employeesWithPositions.position',
          'head',
        ],
      },
    )

    logger.traceObject({ department })

    const res = new FindResponse.Department({
      ...department,
      head: mapEmployeeToEmployeeShort(department.head),
      employees: department.employeesWithPositions
        .getItems()
        .map(mapEmployeeDepartmentPositionToEmployeeShortWithPosition),
    })
    logger.trace({ res }, '<')
    return res
  }

  public async update(id: number, req: UpdateRequest.Department) {
    const logger = this.logger.child('update')
    logger.trace('>')
    const department = await this.em.findOneOrFail(
      Department,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )
    department.name = req.name
    department.description = req.description
    department.competencies = req.competencies

    const head = await this.em.findOneOrFail(
      Employee,
      { id: req.head },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    department.head = head
    await this.em.persistAndFlush(department)

    logger.traceObject({ department })

    return department
  }

  public async create(req: CreateRequest.Department) {
    const logger = this.logger.child('create')
    logger.trace('>')
    await failIfExists(
      this.em,
      Department,
      { name: req.name },
      conflictHandler(logger, {
        message: () => `Department name ${req.name} is already in use.`,
      }),
    )
    const head = await this.em.findOneOrFail(
      Employee,
      { id: req.headId },
      {
        failHandler: notFoundHandler(logger),
      },
    )
    const department = new Department({ ...req, head })
    await this.em.persistAndFlush(department)

    logger.traceObject({ department })

    return department
  }

  public async delete(id: number) {
    const logger = this.logger.child('delete', { id })
    logger.trace('>')

    const department = await this.em.findOneOrFail(
      Department,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    await this.em.removeAndFlush(department)

    logger.traceObject({ department })

    return department.id
  }
}
