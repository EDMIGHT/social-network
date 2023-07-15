import { Request, Response } from 'express';

import commentModel from '@/models/comment.model';
import postModel from '@/models/post.model';
import customResponse from '@/utils/helpers/customResponse';

export const getAllCommentsForPost = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { postId } = request.params;
  try {
    const { page = 1, limit = 9, sort = 'createdAt', order = 'desc' } = request.query;

    const comments = await commentModel.getAllByPostId({
      postId,
      page: +page,
      limit: +limit,
      sort: sort as string,
      order: order as 'asc' | 'desc',
    });

    const totalComments = await commentModel.getTotalCommentByPost(postId);

    return customResponse.ok(response, {
      comments: comments,
      currentPage: +page,
      totalPages: Math.ceil(totalComments / +limit),
    });
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: 'an error occurred on the server while fetching all comments',
      ...request.query,
    });
  }
};

export const createComment = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { postId } = request.params;
  try {
    const existedPost = await postModel.getById(postId);

    if (!existedPost) {
      return customResponse.notFound(response, {
        message: `post with id = ${postId} not found`,
      });
    }

    const newComment = await commentModel.create({
      postId,
      userId: request.user.id,
      text: request.body.text as string,
    });

    return customResponse.created(response, newComment);
  } catch (error) {
    return customResponse.serverError(response, {
      message: 'error creating comment',
      ...request.query,
    });
  }
};
