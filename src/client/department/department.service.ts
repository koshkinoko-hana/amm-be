import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'
import { Department } from '@entities'
import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { mapEmployeeDepartmentPositionToDepartmentEmployeeList } from '@utils'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'

@Injectable()
export class DepartmentService {
  constructor(
    private readonly em: EntityManager,
    private readonly firebaseStorageProvider: FirebaseStorageProvider,
  ) {}

  public async findAll(): Promise<FindAllResponse.Department[]> {
    const departments = await this.em.find(Department, {})
    const res: FindAllResponse.Department[] = departments.map(
      (d: Department) => new FindAllResponse.Department(d),
    )
    return res
  }

  public async find(id: number) {
    const department = await this.em.findOneOrFail(
      Department,
      {
        id,
      },
      {
        populate: [
          'head',
          'employeesWithPositions',
          'employeesWithPositions.employee',
          'employeesWithPositions.employee.photo',
          'employeesWithPositions.position',
        ],
      },
    )
    const res = new FindResponse.Department({
      ...department,
      employees: await mapEmployeeDepartmentPositionToDepartmentEmployeeList(
        department.employeesWithPositions.getItems(),
        this.firebaseStorageProvider,
      ),
    })
    return res
  }
}
