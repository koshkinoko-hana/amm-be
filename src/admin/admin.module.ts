import { Module } from '@nestjs/common';
import { AuditoryModule } from './auditory';
import { PositionModule } from './position/position.module';

@Module({
    imports: [
        PositionModule,
        AuditoryModule
    ],
})
export class AdminModule {}
