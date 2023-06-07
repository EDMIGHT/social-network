import { Request, Response } from 'express';

import prisma from '@/db/prisma';
import postModel from '@/models/post.model';
import customResponse from '@/utils/helpers/customResponse';

export const allPosts = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { tags, page = 1, limit = 10, order = 'desc', sort = 'createdAt' } = request.query;

    const totalPostsCount = await prisma.post.count();
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
