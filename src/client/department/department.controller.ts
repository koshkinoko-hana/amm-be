import { Controller, Get, Param } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { DepartmentService } from './department.service'
import { FindResponse } from './dto/find.response'

@Controller('/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get(':id')
  public async find(@Param('id') id: number): Promise<FindResponse.Department> {
    const res = await this.departmentService.find(id)
    return res
  }

  @Get()
  public async findAll(): Promise<FindAllResponse.Department[]> {
    const res = await this.departmentService.findAll()
    return res
  }
}
