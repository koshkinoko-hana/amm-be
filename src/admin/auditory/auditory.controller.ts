import {Body, Controller, Get, Param, Post, Put, Query} from "@nestjs/common";
import {InjectLogger, Logger} from "@logger";
import {AuditoryService} from "./auditory.service";
import {PaginatedResponseWrapper} from "@common/dto/wrappers/paginated.response-wrapper";
import {FindAllResponse} from "./dto/find-all.response";
import {PaginationQuery} from "@common/dto/pagination.query";
import {FindAllRequest} from "./dto/find-all.request";
import {ResponseWrapper} from "@common/dto/wrappers/response-wrapper";
import {UpdateRequest} from "./dto/update.request";
import {FindResponse} from "./dto/find.response";
import {CreateRequest} from "./dto/create.request";

@Controller('/admin/auditories')
export class AuditoryController {
    constructor(
        @InjectLogger(AuditoryController)
        private readonly logger: Logger,
        private readonly auditoryService: AuditoryService,
    ) {
        this.logger.child('constructor').trace('<>')
    }

    @Get()
    public async findAll(
        @Query() pagination: PaginationQuery,
        @Query() sorting: FindAllRequest.SortingQuery,
        @Query() filters: FindAllRequest.FiltersQuery,
    ): Promise<PaginatedResponseWrapper<FindAllResponse.Auditory>>  {
        const logger = this.logger.child('findAll')
        logger.trace('>')
        const [auditories, pageInfo] = await this.auditoryService.findAll(pagination, sorting, filters)

        logger.traceObject({ auditories, pageInfo })

        const res = new PaginatedResponseWrapper(auditories, pageInfo)
        logger.trace({ res }, '<')
        return res
    }

    @Get(':id')
    public async find(
        @Param('id') id: number,
    ): Promise<ResponseWrapper<FindResponse.Auditory>>  {
        const logger = this.logger.child('find')
        logger.trace('>')
        const auditory = await this.auditoryService.find(id)

        logger.traceObject({ auditory })

        const res = new ResponseWrapper(auditory)
        logger.trace({ res }, '<')
        return res
    }

    @Put(':id')
    public async update(
        @Param('id') id: number,
        @Body() req: UpdateRequest.Auditory,
    ): Promise<ResponseWrapper<number>>  {
        const logger = this.logger.child('update')
        logger.trace('>')
        const updatedId = await this.auditoryService.update(id, req)

        logger.traceObject({ updatedId })

        const res = new ResponseWrapper(updatedId)
        logger.trace({ res }, '<')
        return res
    }

    @Post()
    public async create(
        @Body() req: CreateRequest.Auditory,
    ): Promise<ResponseWrapper<number>>  {
        const logger = this.logger.child('update')
        logger.trace('>')
        const id = await this.auditoryService.create(req)

        logger.traceObject({ id })

        const res = new ResponseWrapper(id)
        logger.trace({ res }, '<')
        return res
    }

}