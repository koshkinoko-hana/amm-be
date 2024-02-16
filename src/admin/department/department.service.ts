import { EmployeePositionShort } from '@common/dto/employee-short'
import { Option } from '@common/dto/option'
import { EmployeeDepartmentPosition } from '@common/entities/employee-department-position.entity'
import { conflictHandler, failIfExists, notFoundHandler } from '@common/utils/fail-handler'
import { Department, Employee, Position } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable, NotFoundException } from '@nestjs/common'
import {
  mapEmployeeToEmployeeShort,
  mapEmployeeDepartmentPositionToEmployeePositionShort,
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
        .map(mapEmployeeDepartmentPositionToEmployeePositionShort),
    })
    logger.trace({ res }, '<')
    return res
  }

  public async update(id: number, req: UpdateRequest.Department) {
    const logger = this.logger.child('update')
    logger.trace('>', { id, req })
    const department = await this.em.findOneOrFail(
      Department,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
      },
    )
    await failIfExists(
      this.em,
      Department,
      { name: req.name, $not: { id } },
      conflictHandler(logger, {
        message: () => `Название кафедры ${req.name} уже используется.`,
      }),
    )
    department.name = req.name
    department.description = req.description
    department.competencies = req.competencies
    department.phones = req.phones
    department.address = req.address
    department.email = req.email

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

  public async updateDepartmentEmployees(id: number, req: EmployeePositionShort[]) {
    const logger = this.logger.child('updateDepartmentEmployees')
    logger.trace('>', { id, req })

    const department = await this.em.findOneOrFail(
      Department,
      {
        id,
      },
      {
        failHandler: notFoundHandler(logger),
        populate: ['employeesWithPositions'],
      },
    )

    const edps = department.employeesWithPositions.getItems()

    const currentEmployeePositionMap = new Map(
      edps.map((edp) => [`${edp.employee.id}_${edp.position.id}`, edp]),
    )
    const updatedEmployeePositionSet = new Set(req.map((edp) => `${edp.id}_${edp.positionId}`))

    const positionList = await this.em.find(Position, {})

    for (const ep of updatedEmployeePositionSet) {
      if (!currentEmployeePositionMap.has(ep)) {
        const [employeeId, positionId] = ep.split('_')
        const position = positionList.find((p) => p.id === Number(positionId))
        if (!position) {
          throw new NotFoundException(`Должность с ID ${positionId} не найдена`)
        }

        const employee = await this.em.findOneOrFail(
          Employee,
          { id: Number(employeeId) },
          {
            failHandler: notFoundHandler(logger),
          },
        )

        if (!employee) {
          throw new NotFoundException(`Сотрудник с ID ${employeeId} не найден`)
        }

        const edp = new EmployeeDepartmentPosition({
          employee,
          department,
          position,
        })
        this.em.persist(edp)
      } else {
        currentEmployeePositionMap.delete(ep)
      }
    }

    for (const ep of currentEmployeePositionMap.values()) {
      this.em.remove(ep)
    }

    await this.em.flush()

    logger.trace('<')
  }

  public async create(req: CreateRequest.Department) {
    const logger = this.logger.child('create')
    logger.trace('>')
    await failIfExists(
      this.em,
      Department,
      { name: req.name },
      conflictHandler(logger, {
        message: () => `Название кафедры ${req.name} уже используется.`,
      }),
    )
    const head = await this.em.findOneOrFail(
      Employee,
      { id: req.head },
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
