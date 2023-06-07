import { Request, Response } from 'express';

import postModel from '@/models/post.model';
import customResponse from '@/utils/helpers/customResponse';

export const allPosts = async (request: Request, response: Response): Promise<Response> => {
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
    authorId: request.user.id,
  });

  return customResponse.created(response, {
    post,
  });
};
