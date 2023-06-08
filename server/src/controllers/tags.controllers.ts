import { Request, Response } from 'express';

import tagModel from '@/models/tag.model';
import customResponse from '@/utils/helpers/customResponse';

export const getAllTags = async (request: Request, response: Response): Promise<Response> => {
  const { name = '', page = 1, limit = 20, order = 'desc' } = request.query;
  try {
    const tags = await tagModel.getAll({
      name: name as string,
      page: +page,
      limit: +limit,
      order: order as string,
    });

    return customResponse.ok(response, {
      tags,
    });
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server side while fetching tags: \n${error}`,
      query: {
        ...request.query,
      },
    });
  }
};

export const createTag = async (request: Request, response: Response): Promise<Response> => {
  try {
    const tag = await tagModel.create({
      ...request.body,
    });

    return customResponse.created(response, {
      tag,
    });
  } catch (error) {
    return customResponse.serverError(response, {
      message: `an error occurred on the north side when creating a tag based on the passed body: \n${error}`,
      body: {
        ...request.body,
      },
    });
  }
};
