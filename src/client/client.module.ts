import { Module } from '@nestjs/common'
import { ClientDepartmentModule } from './department'
import { ClientEmployeeModule } from './employee'
import { ClientPositionModule } from './position'
import { ClientFaqModule } from './faq'

@Module({
  imports: [ClientDepartmentModule, ClientEmployeeModule, ClientPositionModule, ClientFaqModule],
})
export class ClientModule {}
