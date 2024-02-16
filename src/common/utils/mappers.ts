import { DepartmentPositionShort } from '@common/dto/department-position-short'
import { EmployeeShort, EmployeePositionShort } from '@common/dto/employee-short'
import { Option } from '@common/dto/option'
import { EmployeeDepartmentPosition } from '@common/entities/employee-department-position.entity'
import { FirebaseStorageProvider } from '@common/file-helper/firebase-storage.provider'
import { Employee } from '@entities'
import { FindResponse } from '../../client/department/dto/find.response'

export function mapEmployeeToEmployeeShort(e: Employee): EmployeeShort {
  return {
    id: e.id,
    name: `${e.lastName} ${e.firstName} ${e.middleName}`,
  }
}

export function mapEmployeeDepartmentPositionToDepartmentPosition(
  ep: EmployeeDepartmentPosition,
): DepartmentPositionShort {
  return {
    departmentId: ep.department?.id,
    departmentName: ep.department?.name,
    positionId: ep.position.id,
    positionName: ep.position.name,
  }
}

export function mapEmployeeDepartmentPositionToEmployeePositionShort(
  ep: EmployeeDepartmentPosition,
): EmployeePositionShort {
  return {
    id: ep.employee.id,
    name: `${ep.employee.lastName} ${ep.employee.firstName} ${ep.employee.middleName}`,
    positionId: ep.position.id,
    positionName: ep.position.name,
  }
}

export async function mapEmployeeDepartmentPositionToDepartmentEmployeeList(
  list: EmployeeDepartmentPosition[],
  firebaseStorageProvider: FirebaseStorageProvider,
): Promise<FindResponse.DepartmentEmployee[]> {
  const mappedByEmployeeId = new Map<number, FindResponse.DepartmentEmployee>()
  for (const edp of list) {
    if (!mappedByEmployeeId.has(edp.employee.id)) {
      mappedByEmployeeId.set(edp.employee.id, {
        ...edp.employee,
        photoPath:
          edp.employee.photo && (await firebaseStorageProvider.getFile(edp.employee.photo)),
        positions: [edp.position.name],
      })
    } else {
      mappedByEmployeeId.get(edp.employee.id)!.positions.push(edp.position.name)
    }
  }
  return [...mappedByEmployeeId.values()]
}

export function mapEmployeeToOption(e: Employee): Option {
  return {
    value: e.id,
    label: `${e.lastName} ${e.firstName} ${e.middleName}`,
  }
}
