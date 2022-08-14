import * as weekRepository from "../database/default/repository/weekRepository";
import { FindManyOptions, FindOneOptions } from "typeorm";
import Week from "../database/default/entity/week";
import { IUpsertWeek } from "../shared/interfaces";

export const find = async (opts: FindManyOptions<Week>): Promise<Week[]> => {
  return weekRepository.find(opts);
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  return weekRepository.findById(id, opts);
};

export const upsert = async (payload: IUpsertWeek): Promise<Week> => {
  const week = new Week();

  const currentWeek = await findById(payload.id);

  if (currentWeek.isPublished) {
    throw new Error("Cannot update published week");
  }

  return weekRepository.upsert({
    id: payload.id,
    isPublished: payload.isPublished,
    publishedDate: payload.publishedDate,
    ...week,
  });
};
