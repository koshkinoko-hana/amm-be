import { EmployeeResponse } from '@admin/employee/dto/employee.response'
import { notFoundHandler } from '@common/utils/fail-handler'
import { Employee } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { CreateRequest } from './dto/create.request'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { UpdateRequest } from './dto/update.request'

@Injectable()
export class EmployeeService {
  constructor(
    @InjectLogger(EmployeeService)
    private readonly logger: Logger,
    private readonly em: EntityManager,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findAll(): Promise<FindAllResponse.Employee[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const departments = await this.em.find(Employee, {})
    logger.trace({ departments })
    const res: FindAllResponse.Employee[] = departments.map(
      (e: Employee) =>
        new FindAllResponse.Employee({
          ...e,
          name: `${e.firstName} ${e.middleName} ${e.lastName}`,
          positions: e.positions.toArray(),
        }),
    )

    logger.trace({ res })
    return res
  }

  public async find(id: number) {
    const logger = this.logger.child('findAll')
    logger.trace('>')
    const employee = await this.em.findOneOrFail(
      Employee,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    logger.traceObject({ employee })

    const res = new FindResponse.Employee({
      ...employee,
      positions: employee.positions.toArray(),
    })
    logger.trace({ res }, '<')
    return res
  }

  public async update(id: number, req: UpdateRequest.Employee) {
    const logger = this.logger.child('update')
    logger.trace('>')
    const employee = await this.em.findOneOrFail(
      Employee,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )
    employee.firstName = req.firstName
    employee.middleName = req.middleName
    employee.lastName = req.lastName
    employee.description = req.description
    employee.firstName = req.firstName
    employee.description = req.description
    employee.photo = req.photo
    await this.em.persistAndFlush(employee)

    logger.traceObject({ employee })

    return new EmployeeResponse({
      ...employee,
      positions: employee.positions.toArray(),
    })
  }

  public async create(req: CreateRequest.Employee) {
    const logger = this.logger.child('create')
    logger.trace('>')
    // const emplyee = new Employee(req)
    // await this.em.persistAndFlush(department)

    // logger.traceObject({ department })

    // return department
  }

  public async delete(id: number) {
    const logger = this.logger.child('delete', { id })
    logger.trace('>')

    const employee = await this.em.findOneOrFail(
      Employee,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )

    await this.em.removeAndFlush(employee)

    logger.traceObject({ employee })

    return employee.id
  }
}
