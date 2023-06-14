import { EmployeeResponse } from '@admin/employee/dto/employee.response'
import { Department, Employee, Position } from '@entities'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { UpdateRequest } from './dto/update.request'
import { FindByDepartmentResponse } from './dto/find-by-department.response'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'

@Injectable()
export class EmployeeService {
  constructor(
    private readonly em: EntityManager,
    private readonly storageProvider: FirebaseStorageProvider,
  ) {}

  public async findAll(): Promise<FindAllResponse.Employee[]> {
    const employees = await this.em.find(
      Employee,
      {},
      { populate: ['photo', 'positions', 'departments'] },
    )
    const res: FindAllResponse.Employee[] = await Promise.all(
      employees.map(async (e: Employee) => {
        let photoPath = ''
        if (e.photo?.path) {
          photoPath = await this.storageProvider.getFile(e.photo.path)
        }
        return new FindAllResponse.Employee({
          ...e,
          photoPath,
          positions: e.positions.toArray(),
          departments: e.departments.toArray(),
        })
      }),
    )
    return res
  }

  public async findByDepartment(
    id_department: number,
  ): Promise<FindByDepartmentResponse.Employee[]> {
    const employees = await this.em.find(
      Employee,
      {},
      { populate: ['photo', 'positions', 'departments'] },
    )
    const filteredEmployees = employees.filter((e: Employee) =>
      e.departments.getItems().some((department) => department.id === Number(id_department)),
    )
    const res: FindByDepartmentResponse.Employee[] = await Promise.all(
      filteredEmployees.map(async (e: Employee) => {
        let photoPath = ''
        if (e.photo?.path) {
          photoPath = await this.storageProvider.getFile(e.photo.path)
        }
        return new FindByDepartmentResponse.Employee({
          ...e,
          photoPath,
          positions: e.positions.getItems(),
          departments: e.departments.getItems(),
        })
      }),
    )
    return res
  }

  public async find(id: number) {
    const employee = await this.em.findOneOrFail(
      Employee,
      {
        id,
      },
      {
        populate: ['positions', 'departments'],
      },
    )
    if (employee.photo) {
      await this.em.populate(employee, ['photo'])
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
      photoPath: employee.photo?.path,
    })

    return res
  }

  public async update(id: number, req: UpdateRequest.Employee) {
    const employee = await this.em.findOneOrFail(
      Employee,
      {
        id,
      },
      {
        populate: ['photo', 'positions', 'departments'],
      },
    )

    employee.firstName = req.firstName
    employee.middleName = req.middleName
    employee.lastName = req.lastName
    employee.description = req.description

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

    return new EmployeeResponse({
      ...employee,
      positions: employee.positions.toArray(),
      departments: employee.departments.toArray(),
      photoId: employee.photo?.id,
      photoPath: employee.photo?.path,
    })
  }
}
