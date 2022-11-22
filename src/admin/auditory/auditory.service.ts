import {Injectable} from "@nestjs/common";
import {InjectLogger, Logger} from "@logger";
import {EntityManager} from "@mikro-orm/core";
import {Auditory} from "@entities";
import {FindAllResponse} from "./dto/find-all.response";
import {PageInfo} from "@common/dto/page-info";
import {PaginationQuery} from "@common/dto";
import {FindAllRequest} from "./dto/find-all.request";
import {conflictHandler, failIfExists, notFoundHandler} from "@common/utils/fail-handler";
import {FindResponse} from "./dto/find.response";
import {UpdateRequest} from "./dto/update.request";
import {CreateRequest} from "./dto/create.request";

@Injectable()
export class AuditoryService {

    constructor(
        @InjectLogger(AuditoryService)
        private readonly logger: Logger,
        private readonly em: EntityManager,
    ) {
        this.logger.child('constructor').trace('<>')
    }

    public async findAll(
        pagination: PaginationQuery,
        sorting: FindAllRequest.SortingQuery,
        filters: FindAllRequest.FiltersQuery
    ): Promise<[FindAllResponse.Auditory[], PageInfo]> {
        const logger = this.logger.child('findAll')
        logger.trace('>')
        const [auditories, total] = await this.em.findAndCount(
            Auditory,
            {
                ...(filters.name ? {name: {$like: `${filters.name}%`}} : {}),
            },
            {
                ...pagination,
            }
        )
        logger.trace({auditories, total})
        const res: [FindAllResponse.Auditory[], PageInfo] = [
            auditories.map((pos: Auditory) => new FindAllResponse.Auditory(pos)),
            { total, ...pagination }
        ]
        logger.trace({res})
        return res
    }

    public async find(id: number) {
        const logger = this.logger.child('findAll')
        logger.trace('>')
        const auditory = await this.em.findOneOrFail(
            Auditory,
            {
                id
            },
            {
                failHandler: notFoundHandler(logger),
            }
        )

        logger.traceObject({ auditory })

        const res = new FindResponse.Auditory(auditory)
        logger.trace({ res }, '<')
        return res
    }

    public async update(id: number, req: UpdateRequest.Auditory) {
        const logger = this.logger.child('update')
        logger.trace('>')
        const auditory = await this.em.findOneOrFail(
            Auditory,
            {
                id
            },
            {
                failHandler: notFoundHandler(logger),
            }
        )
        auditory.name = req.name
        auditory.size = req.size
        auditory.type = req.type

        await this.em.persistAndFlush(auditory)

        logger.traceObject({ auditory })

        return auditory.id
    }

    public async create(req: CreateRequest.Auditory) {
        const logger = this.logger.child('update')
        logger.trace('>')
        await failIfExists(
            this.em,
            Auditory,
            {name: req.name},
            conflictHandler(logger, { message: () => `Brand name ${req.name} is already in use.` }),
        )
        const auditory = new Auditory(req)
        await this.em.persistAndFlush(auditory)

        logger.traceObject({ auditory })

        return auditory.id
    }
}