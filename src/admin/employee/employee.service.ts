import { EmployeeResponse } from '@admin/employee/dto/employee.response'
import { Option } from '@common/dto/option'
import { EmployeeDepartmentPosition } from '@common/entities/employee-position.entity'
import { notFoundHandler } from '@common/utils/fail-handler'
import { Department, Employee, Position } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable, NotFoundException } from '@nestjs/common'
import { mapEmployeeDepartmentPositionToDepartmentPosition, mapEmployeeToOption } from '@utils'
import { CreateRequest } from './dto/create.request'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { UpdateRequest } from './dto/update.request'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'

@Injectable()
export class EmployeeService {
  constructor(
    @InjectLogger(EmployeeService)
    private readonly logger: Logger,
    private readonly em: EntityManager,
    private readonly storageProvider: FirebaseStorageProvider,
  ) {
    this.logger.child('constructor').trace('<>')
  }

  public async findAll(): Promise<FindAllResponse.Employee[]> {
    const logger = this.logger.child('findAll')
    logger.trace('>')

    const employees = await this.em.find(
      Employee,
      {},
      {
        populate: [
          'photo',
          'employeeDepartmentPositions',
          'employeeDepartmentPositions.position',
          'employeeDepartmentPositions.department',
        ],
      },
    )

    logger.trace({ employees })

    const resolve: Promise<FindAllResponse.Employee>[] = employees.map(async (e: Employee) => {
      let photoPath = ''
      if (e.photo?.path) {
        photoPath = await this.storageProvider.getFile(e.photo.path)
      }
      return new FindAllResponse.Employee({
        ...e,
        departmentPositions: e.employeeDepartmentPositions
          .getItems()
          .map(mapEmployeeDepartmentPositionToDepartmentPosition),
        photoPath,
      })
    })

    const res = await Promise.all(resolve)
    logger.trace({ res })
    return res
  }

  public async findOptions(): Promise<Option[]> {
    const logger = this.logger.child('findOptions')
    logger.trace('>')

    const employees = await this.em.find(Employee, {})

    logger.trace({ employees })

    const res = employees.map((e) => mapEmployeeToOption(e))
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
        populate: [
          'employeeDepartmentPositions',
          'employeeDepartmentPositions.position',
          'employeeDepartmentPositions.department',
        ],
        failHandler: notFoundHandler(logger),
      },
    )

    if (employee.photo) {
      await this.em.populate(employee, ['photo'])
    }

    logger.traceObject({ employee })

    let photoPath = ''
    if (employee.photo?.path) {
      photoPath = await this.storageProvider.getFile(employee.photo.path)
    }

    const res = new FindResponse.Employee({
      ...employee,
      departmentPositions: employee.employeeDepartmentPositions
        .getItems()
        .map(mapEmployeeDepartmentPositionToDepartmentPosition),
      photoPath,
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
        populate: [
          'photo',
          'employeeDepartmentPositions',
          'employeeDepartmentPositions.position',
          'employeeDepartmentPositions.department',
        ],
      },
    )

    employee.firstName = req.firstName
    employee.middleName = req.middleName
    employee.lastName = req.lastName
    employee.description = req.description
    if (req.photoId !== undefined) employee.photoId = req.photoId

    const currentDepartmentPositionsMap = new Map(
      employee.employeeDepartmentPositions
        .getItems()
        .map((edp) => [`${edp.position.id}_${edp.department?.id ?? ''}`, edp]),
    )
    const updatedDepartmentPositionsSet = new Set(
      employee.employeeDepartmentPositions
        .getItems()
        .map((edp) => `${edp.position.id}_${edp.department?.id ?? ''}`),
    )

    const positionList = await this.em.find(Position, {})
    const departmentList = await this.em.find(Department, {})

    for (const dp of updatedDepartmentPositionsSet) {
      if (!currentDepartmentPositionsMap.has(dp)) {
        const [positionId, departmentId] = dp.split('_')
        const position = positionList.find((p) => p.id === (positionId as unknown as number))
        if (!position) {
          throw new NotFoundException(`Position with ID ${positionId} not found`)
        }

        let department: Department | undefined

        if (departmentId !== '') {
          department = departmentList.find((d) => d.id === (departmentId as unknown as number))
          if (!department) {
            throw new NotFoundException(`Position with ID ${positionId} not found`)
          }
        }

        const edp = new EmployeeDepartmentPosition({
          employee,
          department,
          position,
        })
        this.em.persist(edp)
      } else {
        currentDepartmentPositionsMap.delete(dp)
      }
    }

    for (const dp of currentDepartmentPositionsMap.values()) {
      this.em.remove(dp)
    }

    await this.em.persistAndFlush(employee)

    logger.traceObject({ employee })

    return
  }

  public async create(req: CreateRequest.Employee) {
    const logger = this.logger.child('create')
    logger.trace('>')
    const employee = new Employee({
      firstName: req.firstName,
      middleName: req.middleName,
      lastName: req.lastName,
      description: req.description,
      photoId: req.photoId,
    })

    await this.em.persistAndFlush(employee)

    const positionList = await this.em.find(Position, {})
    const departmentList = await this.em.find(Department, {})

    for (const dp of req.departmentPositions) {
      const position = positionList.find((p) => (p.id = dp.positionId))
      if (!position) {
        throw new NotFoundException(
          `position id=${dp.positionId} name=${dp.positionName} not found`,
        )
      }
      const edp = new EmployeeDepartmentPosition({
        employee,
        position: positionList.find((p) => (p.id = dp.positionId)),
        department: departmentList.find((d) => (d.id = dp.positionId)),
      })
    }

    logger.traceObject({ employee })
    return employee
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
        populate: ['positions', 'departments', 'photo'],
      },
    )
    if (employee.photo) {
      if (employee.photo.path) await this.storageProvider.deleteFile(employee.photo.path)
      await this.em.removeAndFlush(employee.photo)
    }

    employee.employeeDepartmentPosition.removeAll()

    await this.em.flush()
    await this.em.removeAndFlush(employee)

    logger.traceObject({ employee })

    return employee.id
  }
}
