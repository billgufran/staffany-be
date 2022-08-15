/**
 * @todo
 * [ ] nice to have: add validation for publishedAt if isPublished is true
 */

import Joi from "joi";

export const upsertWeekDto = Joi.object({
  id: Joi.string().required(),
  isPublished: Joi.boolean(),
  publishedAt: Joi.string(),
});
