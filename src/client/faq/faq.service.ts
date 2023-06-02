import { EntityManager } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { FindAllResponse } from './dto/find-all.response'
import { FindResponse } from './dto/find.response'
import { UpdateRequest } from './dto/update.request'
import { Faq } from '@entities'
import { CreateRequest } from './dto/create.request'
import { FaqResponse } from './dto/faq.response'

@Injectable()
export class FaqService {
  constructor(private readonly em: EntityManager) {}

  public async findAll(): Promise<FindAllResponse.Faq[]> {
    const faqs = await this.em.find(Faq, {}, {})
    console.log('🚀 ~ file: faq.service.ts:16 ~ FaqService ~ findAll ~ faqs:', faqs)

    const res: FindAllResponse.Faq[] = faqs.map(
      (e: Faq) =>
        new FindAllResponse.Faq({
          ...e,
        }),
    )
    return res
  }

  public async find(id: number) {
    const question = await this.em.findOneOrFail(Faq, { id }, {})
    const res = new FindResponse.Faq({ ...question })
    return res
  }

  public async update(id: number, req: UpdateRequest.Faq) {
    const faq = await this.em.findOneOrFail(Faq, { id }, {})

    faq.firstName = req.firstName
    faq.middleName = req.middleName
    faq.lastName = req.lastName
    faq.email = req.email
    faq.question = req.question
    faq.answer = req.answer
    faq.respondent = req.respondent

    await this.em.persistAndFlush(faq)

    return new FaqResponse({ ...faq })
  }
  public async create(req: CreateRequest.Faq) {
    const faq = new Faq(req)
    await this.em.persistAndFlush(faq)
    return faq
  }

  public async delete(id: number) {
    const faq = await this.em.findOneOrFail(Faq, { id }, {})

    await this.em.removeAndFlush(faq)
    return faq.id
  }
}
