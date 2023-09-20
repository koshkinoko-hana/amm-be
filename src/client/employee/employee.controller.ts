import { EmployeeResponse } from './dto/employee.response'
import { Controller, Get, Param } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { EmployeeService } from './employee.service'

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get(':id')
  public async find(@Param('id') id: number): Promise<EmployeeResponse> {
    const res = await this.employeeService.find(id)
    return res
  }

  @Get()
  public async findAll(): Promise<FindAllResponse.Employee[]> {
    const res = await this.employeeService.findAll()
    return res
  }
}
