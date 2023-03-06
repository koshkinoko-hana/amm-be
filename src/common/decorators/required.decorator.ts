import { createParamDecorator, BadRequestException } from '@nestjs/common'

export const Required = createParamDecorator((data: string, req) => {
  if (!req[data]) {
    throw new BadRequestException(`${data} is required!`)
  }

  return req[data]
})
