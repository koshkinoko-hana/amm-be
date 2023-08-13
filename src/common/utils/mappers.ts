import { DepartmentPositionShort } from '@common/dto/department-position-short'
import { EmployeeShort, EmployeePositionShort } from '@common/dto/employee-short'
import { Option } from '@common/dto/option'
import { EmployeeDepartmentPosition } from '@common/entities/employee-position.entity'
import { Employee } from '@entities'

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

export function mapEmployeePositionToEmployeeShortWithPosition(
  ep: EmployeeDepartmentPosition,
): EmployeePositionShort {
  return {
    id: ep.employee.id,
    name: `${ep.employee.lastName} ${ep.employee.firstName} ${ep.employee.middleName}`,
    positionId: ep.position.id,
    positionName: ep.position.name,
  }
}

export function mapEmployeeToOption(e: Employee): Option {
  return {
    value: e.id,
    label: `${e.lastName} ${e.firstName} ${e.middleName}`,
  }
}
