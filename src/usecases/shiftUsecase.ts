/**
 * @todo
 * [ ] refactor: findWeekById is redundant since upsertWeek is doing the same
 * [ ] handle deleteById partial error
 */

import * as shiftRepository from "../database/default/repository/shiftRepository";
import { FindManyOptions, FindOneOptions } from "typeorm";
import Shift from "../database/default/entity/shift";
import { ICreateShift, IUpdateShift } from "../shared/interfaces";
import { findById as findWeekById, upsert as upsertWeek } from "./weekUsecase";

export const find = async (opts: FindManyOptions<Shift>): Promise<Shift[]> => {
  return shiftRepository.find(opts);
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  return shiftRepository.findById(id, opts);
};

export const findByIds = async (
  ids: string | string[],
  opts?: FindOneOptions<Shift>
): Promise<Shift[]> => {
  return shiftRepository.findByIds(typeof ids === "string" ? [ids] : ids, opts);
};

export const create = async (payload: ICreateShift): Promise<Shift> => {
  const shift = new Shift();

  const week = await findWeekById(payload.weekId);

  if (!week) {
    upsertWeek({ id: payload.weekId });
  } else {
    if (week.isPublished) {
      throw new Error("Cannot create shift in published week");
    }
  }

  return shiftRepository.create({
    ...shift,
    ...payload,
  });
};

export const updateById = async (
  id: string,
  payload: IUpdateShift
): Promise<Shift> => {
  const week = await findWeekById(payload.weekId);

  if (!week) {
    upsertWeek({ id: payload.weekId });
  } else {
    if (week.isPublished) {
      throw new Error("Cannot create shift in published week");
    }
  }

  return shiftRepository.updateById(id, {
    ...payload,
    isPublished: week?.isPublished ?? false,
  });
};

export const upsert = async (
  payload: IUpdateShift | IUpdateShift[]
): Promise<Shift | Shift[]> => {
  const shift = new Shift();

  const updatedPayload = Array.isArray(payload)
    ? payload.map((p) => ({ ...shift, ...p }))
    : { ...shift, ...payload };

  return shiftRepository.upsert(updatedPayload);
};

export const deleteById = async (id: string | string[]) => {
  const shift = await findByIds(id);
  const publishedShift = [];
  const unpublishedShift = [];

  shift.forEach((shift) => {
    if (shift.isPublished) {
      publishedShift.push(shift.id);
    } else {
      unpublishedShift.push(shift.id);
    }
  });

  console.log("publishedShift ", publishedShift);
  console.log("unpublishedShift ", unpublishedShift);

  if (publishedShift.length > 0) {
    throw new Error("Cannot delete published shift");
  }

  return shiftRepository.deleteById(unpublishedShift);
};
