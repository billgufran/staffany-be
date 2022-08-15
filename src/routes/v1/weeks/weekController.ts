import { Request, ResponseToolkit } from "@hapi/hapi";
import * as weekUsecase from "../../../usecases/weekUsecase";
import { errorHandler } from "../../../shared/functions/error";
import { ISuccessResponse, IUpsertWeek } from "../../../shared/interfaces";
import moduleLogger from "../../../shared/functions/logger";

const logger = moduleLogger("weekController");

export const find = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find weeks");
  try {
    const filter = req.query;
    const data = await weekUsecase.find(filter);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get weeks successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};

export const findById = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find week by id");
  try {
    const id = req.params.id;
    const data = await weekUsecase.findById(id);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get week successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};

export const upsert = async (req: Request, h: ResponseToolkit) => {
  logger.info("Upsert week");
  try {
    const body = req.payload as IUpsertWeek;
    const data = await weekUsecase.upsert(body);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Create week successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};
