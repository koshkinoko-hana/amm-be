import { createParamDecorator, BadRequestException } from '@nestjs/common'

export const Required = createParamDecorator((data: string, req) => {
  if (!req[data]) {
    throw new BadRequestException(`Поле ${data} является обязательным`)
  }

  return req[data]
})
