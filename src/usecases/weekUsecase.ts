import * as weekRepository from "../database/default/repository/weekRepository";
import { FindManyOptions, FindOneOptions } from "typeorm";
import Week from "../database/default/entity/week";
import { IUpsertWeek, IUpdateShift } from "../shared/interfaces";
import { upsert as upsertShift } from "./shiftUsecase";

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

  if (currentWeek) {
    if (currentWeek?.isPublished) {
      throw new Error("Cannot update published week");
    } else {
      upsertShift(
        currentWeek.shifts.map((shift) => ({
          isPublished: true,
          id: shift.id,
          name: shift.name,
          date: shift.date,
          startTime: shift.startTime,
          endTime: shift.endTime,
        })) as IUpdateShift[]
      );
    }
  }

  return weekRepository.upsert({
    ...week,
    id: payload.id,
    isPublished: payload.isPublished,
    publishedAt: payload.publishedAt,
  });
};

export const insertWithId = async (id: string): Promise<Week> => {
  const week = new Week();

  return weekRepository.upsert({
    ...week,
    id: id,
  });
};
