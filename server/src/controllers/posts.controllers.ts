import { Request, Response } from 'express';

import postModel from '@/models/post.model';
import customResponse from '@/utils/helpers/customResponse';

export const getAllPosts = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { tags, page = 1, limit = 10, order = 'desc', sort = 'createdAt' } = request.query;

    const totalPostsCount = await postModel.getTotal();
    const posts = await postModel.getPosts({
      page: +page,
      limit: +limit,
      sort: sort as string,
      order: order as string,
      tags: tags as string,
    });

    return customResponse.ok(response, {
      posts,
      currentPage: page,
      totalPages: Math.floor(totalPostsCount / +limit),
    });
  } catch (error) {
    console.log(error);
    return customResponse.serverError(response, {
      message: `An error occurred on the server side while fetching all posts: ${error}`,
    });
  }
};

export const createPost = async (request: Request, response: Response): Promise<Response> => {
  const { tags } = request.body;

  const tagList = tags ? (tags as string).split(',') : [];

  const post = await postModel.createPost({
    ...request.body,
    tags: tagList,
    userId: request.user.id,
  });

  if (post) {
    return customResponse.created(response, {
      post,
    });
  } else {
    return customResponse.badRequest(response, {
      message: 'failed to create post using passed data',
      data: {
        ...request.body,
      },
    });
  }
};

export const getMyPost = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { tags, page = 1, limit = 10, order = 'desc', sort = 'createdAt' } = request.query;

    const totalPostsCount = await postModel.getTotal();
    const posts = await postModel.getPosts({
      userId: request.user.id,
      page: +page,
      limit: +limit,
      sort: sort as string,
      order: order as string,
      tags: tags as string,
    });

    return customResponse.ok(response, {
      posts,
      currentPage: page,
      totalPages: Math.floor(totalPostsCount / +limit),
    });
  } catch (error) {
    console.log(error);
    return customResponse.serverError(response, {
      message: `An error occurred on the server side while fetching all posts: ${error}`,
    });
  }
};

export const deletePost = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  try {
    const deleteResult = await postModel.deleteById(id);

    if (deleteResult) {
      return customResponse.ok(response, null);
    } else {
      return customResponse.notFound(response, {
        id,
        message: `post with id = ${id} does not exist or has already been deleted`,
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

  const post = await postModel.updateById(id, request.body);

  if (post) {
    return customResponse.ok(response, {
      post,
    });
  } else {
    return customResponse.notFound(response, {
      id,
      message: `post with id = ${id} does not exist`,
    });
  }
};
