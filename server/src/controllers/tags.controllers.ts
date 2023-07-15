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

    const totalCount = await tagModel.getTotal(name as string);

    return customResponse.ok(response, {
      tags,
      currentPage: +page,
      totalPages: Math.ceil(totalCount / +limit),
    });
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server side while fetching tags, error: ${error}`,
      query: {
        ...request.query,
      },
    });
  }
};

export const createTag = async (request: Request, response: Response): Promise<Response> => {
  try {
    const existedTag = await tagModel.getTagByName(request.body.name);
    if (!existedTag) {
      const tag = await tagModel.create({
        ...request.body,
      });

      return customResponse.created(response, tag);
    } else {
      return customResponse.conflict(response, {
        message: `tag named '${request.body.name}' already exists`,
        body: {
          ...request.body,
        },
      });
    }
  } catch (error) {
    return customResponse.serverError(response, {
      message: `an error occurred on the north side when creating a tag based on the passed body, error: ${error}`,
      body: {
        ...request.body,
      },
    });
  }
};

export const updateTag = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  const { name } = request.body;

  try {
    const existedTag = await tagModel.getTagById(id);

    if (existedTag) {
      const newTag = await tagModel.update(id, { name });
      return customResponse.ok(response, newTag);
    } else {
      return customResponse.notFound(response, {
        message: `tag with id = ${id} does not exist`,
        id,
      });
    }
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: `an error occurred while updating the tag on the server side, error: ${error}`,
      id,
      body: {
        ...request.body,
      },
    });
  }
};
