import { Body, Delete, Get, Param, Post, Put, Controller } from '@nestjs/common'
import { FaqService } from './faq.service'
import { FindResponse } from './dto/find.response'
import { FindAllResponse } from './dto/find-all.response'
import { UpdateRequest } from './dto/update.request'
import { FaqResponse } from './dto/faq.response'
import { CreateRequest } from './dto/create.request'

@Controller('/faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get(':id')
  public async find(@Param('id') id: number): Promise<FindResponse.Faq> {
    const res = await this.faqService.find(id)
    return res
  }

  @Get()
  public async findAll(): Promise<FindAllResponse.Faq[]> {
    const res = await this.faqService.findAll()
    return res
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() req: UpdateRequest.Faq,
  ): Promise<FaqResponse> {
    const res = await this.faqService.update(id, req)
    return res
  }

  @Post()
  public async create(@Body() req: CreateRequest.Faq): Promise<number> {
    await this.faqService.create(req)
    return 1
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<number> {
    const res = await this.faqService.delete(id)
    return res
  }
}
