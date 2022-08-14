import { Server } from "@hapi/hapi";
import * as weekController from "./weekController";
import { idDto, upsertWeekDto } from "../../../shared/dtos";

export default function (server: Server, basePath: string) {
  server.route({
    method: "GET",
    path: basePath,
    handler: weekController.find,
    options: {
      description: "Get weeks with filter",
      notes: "Get all weeks if filter is not specified.",
      tags: ["api", "week"],
    },
  });

  server.route({
    method: "GET",
    path: basePath + "/{id}",
    handler: weekController.findById,
    options: {
      description: "Get week by id",
      notes: "Get week by id",
      tags: ["api", "week"],
      validate: {
        params: idDto,
      },
    },
  });

  server.route({
    method: "POST",
    path: basePath,
    handler: weekController.upsert,
    options: {
      description: "Insert and update week",
      notes: "Insert and update week",
      tags: ["api", "week"],
      validate: {
        payload: upsertWeekDto,
      },
    },
  });
}
