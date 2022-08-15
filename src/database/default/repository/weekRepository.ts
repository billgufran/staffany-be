import {
  getRepository,
  FindManyOptions,
  FindOneOptions,
  FindConditions,
} from "typeorm";
import moduleLogger from "../../../shared/functions/logger";
import Week from "../entity/week";

const logger = moduleLogger("weekRepository");

export const find = async (opts?: FindManyOptions<Week>): Promise<Week[]> => {
  logger.info("Find");
  const repository = getRepository(Week);
  const data = await repository.find({
    relations: ["shifts"],
    ...opts,
  });
  return data;
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  logger.info("Find by id");
  const repository = getRepository(Week);
  const data = await repository.findOne(id, {
    relations: ["shifts"],
    ...opts,
  });
  return data;
};

export const findOne = async (
  where?: FindConditions<Week>,
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  logger.info("Find one");
  const repository = getRepository(Week);
  const data = await repository.findOne(where, opts);
  return data;
};

export const upsert = async (payload: Week): Promise<Week> => {
  logger.info("Upsert");

  const repository = getRepository(Week);
  await repository.upsert(payload, ["id"]);
  return findById(payload.id);
};
