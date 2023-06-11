import { EmployeeResponse } from '@admin/employee/dto/employee.response'
import { notFoundHandler } from '@common/utils/fail-handler'
import { Department, Employee, Photo, Position } from '@entities'
import { InjectLogger, Logger } from '@logger'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
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
      { populate: ['photo', 'positions', 'departments'] },
    )

    logger.trace({ employees })

    const resolve: Promise<FindAllResponse.Employee>[] = employees.map(async (e: Employee) => {
      let photoPath = ''
      if (e.photo?.path) {
        photoPath = await this.storageProvider.getFile(e.photo.path)
      }
      return new FindAllResponse.Employee({
        ...e,
        positions: e.positions.toArray(),
        departments: e.departments.toArray(),
        photoPath,
      })
    })

    const res = await Promise.all(resolve)
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
        populate: ['positions', 'departments'],
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
      positions: employee.positions.toArray().map((position) => ({
        value: position.id,
        label: position.name,
      })),
      departments: employee.departments
        .toArray()
        .map((department) => ({ value: department.id, label: department.name })),
      photoPath,
    })
    logger.trace({ res }, '<')
    return res
  }
  // обновление полей
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
        populate: ['photo', 'positions', 'departments'],
      },
    )

    employee.firstName = req.firstName
    employee.middleName = req.middleName
    employee.lastName = req.lastName
    employee.description = req.description
    employee.photoId = req.photoId

    if (req.photoPath) {
      if (employee.photo) {
        employee.photo.path = req.photoPath
        employee.photoId = req.photoId
      } else {
        const photo = new Photo({
          path: req.photoPath,
          type: Photo.PhotoType.UserPhoto,
          title: 'title',
          createdAt: new Date(),
        })
        employee.photo = photo
        employee.photoId = photo.id
      }
    }

    const allPositions = await this.em.find(Position, {})
    const currentPositions = new Set(employee.positions.getItems().map((position) => position.id))
    const updatedPositions = new Set(req.positions.map((positionId) => positionId.value))

    for (const positionId of updatedPositions) {
      if (!currentPositions.has(positionId)) {
        const position = allPositions.find((position) => position.id === positionId)

        if (!position) {
          throw new Error(`Position with ID ${positionId} not found`)
        }

        employee.positions.add(position)
      }
    }
    for (const positionId of currentPositions) {
      if (!updatedPositions.has(positionId)) {
        const position = employee.positions
          .getItems()
          .find((position) => position.id === positionId)

        if (position) {
          employee.positions.remove(position)
        }
      }
    }
    const allDepartments = await this.em.find(Department, {})

    const currentDepartments = new Set(
      employee.departments.getItems().map((department) => department.id),
    )
    const updatedDepartments = new Set(req.departments.map((departmentId) => departmentId.value))

    for (const departmentId of updatedDepartments) {
      if (!currentDepartments.has(departmentId)) {
        const department = allDepartments.find((department) => department.id === departmentId)

        if (!department) {
          throw new Error(`Position with ID ${departmentId} not found`)
        }

        employee.departments.add(department)
      }
    }
    for (const departmentId of currentDepartments) {
      if (!updatedDepartments.has(departmentId)) {
        const department = employee.departments
          .getItems()
          .find((department) => department.id === departmentId)

        if (department) {
          employee.departments.remove(department)
        }
      }
    }
    await this.em.persistAndFlush(employee)

    logger.traceObject({ employee })

    return new EmployeeResponse({
      ...employee,
      positions: employee.positions.toArray(),
      departments: employee.departments.toArray(),
      photoId: employee.photo?.id,
    })
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

    const allPositions = await this.em.find(Position, {})
    const currentPositions = new Set(employee.positions.getItems().map((position) => position.id))
    const updatedPositions = new Set(req.positions.map((positionId) => positionId))

    for (const positionId of updatedPositions) {
      if (!currentPositions.has(positionId)) {
        const position = allPositions.find((position) => position.id === positionId)

        if (!position) {
          throw new Error(`Position with ID ${positionId} not found`)
        }

        employee.positions.add(position)
      }
    }

    for (const positionId of currentPositions) {
      if (!updatedPositions.has(positionId)) {
        const position = employee.positions
          .getItems()
          .find((position) => position.id === positionId)

        if (position) {
          employee.positions.remove(position)
        }
      }
    }

    const allDepartments = await this.em.find(Department, {})
    const currentDepartments = new Set(
      employee.departments.getItems().map((department) => department.id),
    )
    const updatedDepartments = new Set(req.departments.map((departmentId) => departmentId))

    for (const departmentId of updatedDepartments) {
      if (!currentDepartments.has(departmentId)) {
        const department = allDepartments.find((department) => department.id === departmentId)

        if (!department) {
          throw new Error(`Department with ID ${departmentId} not found`)
        }

        employee.departments.add(department)
      }
    }

    for (const departmentId of currentDepartments) {
      if (!updatedDepartments.has(departmentId)) {
        const department = employee.departments
          .getItems()
          .find((department) => department.id === departmentId)

        if (department) {
          employee.departments.remove(department)
        }
      }
    }

    await this.em.persistAndFlush(employee)

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
      },
    )

    await this.em.removeAndFlush(employee)

    logger.traceObject({ employee })

    return employee.id
  }
}
