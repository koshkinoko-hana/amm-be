import {Module} from "@nestjs/common";
import {LoggerModule} from "@logger";
import {AuditoryController} from "./auditory.controller";
import {AuditoryService} from "./auditory.service";

@Module({
    imports:[LoggerModule.forFeature([AuditoryController, AuditoryService])],
    controllers: [AuditoryController],
    providers: [AuditoryService]
})
export class AuditoryModule {}