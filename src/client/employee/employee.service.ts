import { Employee } from '@entities'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { mapEmployeeDepartmentPositionToDepartmentPosition } from '@utils'
import { FindAllResponse } from './dto/find-all.response'
import { EmployeeResponse } from './dto/employee.response'
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
      {
        populate: [
          'photo',
          'employeeDepartmentPositions',
          'employeeDepartmentPositions.position',
          'employeeDepartmentPositions.department',
        ],
      },
    )
    const res: FindAllResponse.Employee[] = await Promise.all(
      employees.map(async (e: Employee) => {
        let photoPath = ''
        if (e.photo?.path) {
          photoPath = await this.storageProvider.getFile(e.photo)
        }
        return new FindAllResponse.Employee({
          ...e,
          photoPath,
          departmentPositions: e.employeeDepartmentPositions
            .getItems()
            .map(mapEmployeeDepartmentPositionToDepartmentPosition),
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
        populate: [
          'employeeDepartmentPositions',
          'employeeDepartmentPositions.department',
          'employeeDepartmentPositions.position',
        ],
      },
    )
    if (employee.photo) {
      await this.em.populate(employee, ['photo'])
    }

    const res = new EmployeeResponse({
      ...employee,
      departmentPositions: employee.employeeDepartmentPositions
        .getItems()
        .map(mapEmployeeDepartmentPositionToDepartmentPosition),
    })

    return res
  }
}
