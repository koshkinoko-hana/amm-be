import { DepartmentResponse } from './dto/department.response'
import { Option } from '@common/dto/option'
import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { UpdateRequest } from './dto/update.request'
import { DepartmentService } from './department.service'

@Controller('/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  public async findAll(): Promise<FindAllResponse.Department[]> {
    const res = await this.departmentService.findAll()
    return res
  }

  @Get('/options')
  public async findOptions(): Promise<Option[]> {
    const res = await this.departmentService.findOptions()
    return res
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() req: UpdateRequest.Department,
  ): Promise<DepartmentResponse> {
    const res = await this.departmentService.update(id, req)
    return res
  }
}
