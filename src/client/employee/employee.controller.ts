import { FindResponse } from './dto/find.response'
import { Controller, Get, Param } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { FindByDepartmentResponse } from './dto/find-by-department.response'
import { EmployeeService } from './employee.service'

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':id')
  public async find(@Param('id') id: number): Promise<FindResponse.Employee> {
    const res = await this.employeeService.find(id)
    return res
  }

  @Get()
  public async findAll(): Promise<FindAllResponse.Employee[]> {
    const res = await this.employeeService.findAll()
    return res
  }

  @Get('by-department/:id_department')
  public async findByDepartment(
    @Param('id_department') id_department: number,
  ): Promise<FindByDepartmentResponse.Employee[]> {
    const res = await this.employeeService.findByDepartment(id_department)
    return res
  }
}
