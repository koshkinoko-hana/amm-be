import {Injectable} from "@nestjs/common";
import {InjectLogger, Logger} from "@logger";
import {EntityManager} from "@mikro-orm/core";
import {Position} from "@entities";
import {FindAllResponse} from "./dto/find-all.response";
import {PageInfo} from "@common/dto/page-info";
import {PaginationQuery} from "@common/dto";
import {FindAllRequest} from "./dto/find-all.request";
import {conflictHandler, failIfExists, notFoundHandler} from "@common/utils/fail-handler";
import {FindResponse} from "./dto/find.response";
import {UpdateRequest} from "./dto/update.request";
import {CreateRequest} from "./dto/create.request";

@Injectable()
export class PositionService {

    constructor(
        @InjectLogger(PositionService)
        private readonly logger: Logger,
        private readonly em: EntityManager,
    ) {
        this.logger.child('constructor').trace('<>')
    }

    public async findAll(
        pagination: PaginationQuery,
        sorting: FindAllRequest.SortingQuery,
        filters: FindAllRequest.FiltersQuery
    ): Promise<[FindAllResponse.Position[], PageInfo]> {
        const logger = this.logger.child('findAll')
        logger.trace('>')
        const [positions, total] = await this.em.findAndCount(
            Position,
            {
                ...(filters.name ? {name: {$like: `${filters.name}%`}} : {}),
            },
            {
                ...pagination,
            }
        )
        logger.trace({positions, total})
        const res: [FindAllResponse.Position[], PageInfo] = [
            positions.map((pos: Position) => new FindAllResponse.Position(pos)),
            { total, ...pagination }
        ]
        logger.trace({res})
        return res
    }

    public async find(id: number) {
        const logger = this.logger.child('findAll')
        logger.trace('>')
        const position = await this.em.findOneOrFail(
            Position,
            {
                id
            },
            {
                failHandler: notFoundHandler(logger),
            }
        )

        logger.traceObject({ position })

        const res = new FindResponse.Position(position)
        logger.trace({ res }, '<')
        return res
    }

    public async update(id: number, req: UpdateRequest.Position) {
        const logger = this.logger.child('update')
        logger.trace('>')
        const position = await this.em.findOneOrFail(
            Position,
            {
                id
            },
            {
                failHandler: notFoundHandler(logger),
            }
        )
        position.name = req.name
        await this.em.persistAndFlush(position)

        logger.traceObject({ position })

        return position.id
    }

    public async create(req: CreateRequest.Position) {
        const logger = this.logger.child('update')
        logger.trace('>')
        await failIfExists(
            this.em,
            Position,
            {name: req.name},
            conflictHandler(logger, { message: () => `Brand name ${req.name} is already in use.` }),
        )
        const position = new Position(req)
        await this.em.persistAndFlush(position)

        logger.traceObject({ position })

        return position.id
    }
}