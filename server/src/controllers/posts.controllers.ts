import { Request, Response } from 'express';

import postModel from '@/models/post.model';
import tagModel from '@/models/tag.model';
import customResponse from '@/utils/helpers/customResponse';

export const getAllPosts = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { tags, page = 1, limit = 10, order = 'desc', sort = 'createdAt' } = request.query;

    const totalPostsCount = await postModel.getTotal();
    const offset = (+page - 1) * +limit;
    const tagList = tags ? (tags as string).split(',') : [];

    const posts = await postModel.get({
      offset,
      limit: +limit,
      sort: sort as string,
      order: order as string,
      tags: tagList,
    });

    if (posts) {
      return customResponse.ok(response, {
        posts,
        currentPage: page,
        totalPages: Math.floor(totalPostsCount / +limit),
      });
    } else {
      return customResponse.badRequest(response, {
        message: 'invalid request query',
        body: {
          ...request.query,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server side while fetching all posts, error: ${error}`,
      query: {
        ...request.query,
      },
    });
  }
};
export const getMyPost = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { tags, page = 1, limit = 10, order = 'desc', sort = 'createdAt' } = request.query;

    const totalPostsCount = await postModel.getTotal();
    const offset = (+page - 1) * +limit;
    const tagList = tags ? (tags as string).split(',') : [];

    const posts = await postModel.get({
      userId: request.user.id,
      offset,
      limit: +limit,
      sort: sort as string,
      order: order as string,
      tags: tagList,
    });

    if (posts) {
      return customResponse.ok(response, {
        posts,
        currentPage: page,
        totalPages: Math.floor(totalPostsCount / +limit),
      });
    } else {
      return customResponse.badRequest(response, {
        message: 'invalid request query',
        body: {
          ...request.query,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server side while fetching your (id user = ${request.user.id}) posts, error: ${error}`,
      query: {
        ...request.query,
      },
    });
  }
};

export const createPost = async (request: Request, response: Response): Promise<Response> => {
  const { tags } = request.body;

  try {
    const tagList = tags ? (tags as string).split(',') : [];

    const existedTags = await tagModel.getTagsById(tagList);

    if (existedTags?.length === tagList.length) {
      const post = await postModel.create({
        ...request.body,
        tags: tagList,
        userId: request.user.id,
      });

      return customResponse.created(response, {
        post,
      });
    } else {
      return customResponse.badRequest(response, {
        message: 'failed to create post using passed data',
        body: {
          ...request.body,
        },
        tags: tagList,
        existedTags,
      });
    }
  } catch (error) {
    console.log(error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server side while creating the post, error: ${error}`,
      body: {
        ...request.body,
      },
    });
  }
};

export const deletePost = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  try {
    const existedPost = await postModel.getById(id);

    if (existedPost) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deleteResult = await postModel.deleteById(id);

      return customResponse.ok(response, null);
    } else {
      return customResponse.notFound(response, {
        message: `post with id = ${id} does not exist or has already been deleted`,
        id,
      });
    }
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server side while deleting the post: ${error}`,
    });
  }
};

export const updatePost = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  const { tags } = request.body;

  try {
    const tagList = tags ? (tags as string).split(',') : [];

    const existedPost = await postModel.getById(id);
    const existedTags = await tagModel.getTagsById(tagList);

    if (existedPost && existedTags?.length === tagList.length) {
      const post = await postModel.updateById(id, { ...request.body, tags: tagList });

      return customResponse.ok(response, post);
    } else {
      return customResponse.notFound(response, {
        message: `post with id = ${id} does not exist or non-existent tags were passed`,
        id,
        tags: tagList,
        existedTags,
      });
    }
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server side when updating post with id ${id}, error: ${error}`,
    });
  }
};
