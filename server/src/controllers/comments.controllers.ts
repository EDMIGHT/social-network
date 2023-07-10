import { Request, Response } from 'express';

import commentModel from '@/models/comment.model';
import customResponse from '@/utils/helpers/customResponse';

export const getAllComments = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { page = 1, limit = 9, sort = 'createdAt', order = 'asc' } = request.query;

    const comments = await commentModel.getAll({
      page: +page,
      limit: +limit,
      sort: sort as string,
      order: order as 'asc' | 'desc',
    });

    return customResponse.ok(response, comments);
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: 'an error occurred on the server while fetching all comments',
      ...request.query,
    });
  }
};
