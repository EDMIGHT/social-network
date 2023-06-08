import { Request, Response } from 'express';

import tagModel from '@/models/tag.model';
import customResponse from '@/utils/helpers/customResponse';

export const getAllTags = async (request: Request, response: Response): Promise<Response> => {
  const { name = '', page = 1, limit = 20, order = 'desc' } = request.query;
  const tags = await tagModel.getAllTags({
    name: name as string,
    page: +page,
    limit: +limit,
    order: order as string,
  });

  return customResponse.ok(response, {
    tags,
  });
};
