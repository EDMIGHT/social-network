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

export const deleteComment = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { postId, commentId } = request.params;
  const { id: authorId } = request.user;

  try {
    const post = await postModel.getById(postId);

    if (!post) {
      return customResponse.notFound(response, {
        message: `post with id = ${postId} was not found`,
      });
    }

    const comment = await commentModel.getById(commentId);

    if (!comment) {
      return customResponse.notFound(response, {
        message: `comment with id = ${commentId} was not found`,
      });
    }

    if (post.user.id === authorId || comment.userId === authorId) {
      await commentModel.deleteById(commentId);

      return customResponse.ok(response, {
        message: 'comment has been successfully deleted',
      });
    }

    return customResponse.conflict(response, {
      message: `You do not have permission to delete a comment with id = ${commentId}`,
    });
  } catch (error) {
    return customResponse.serverError(response, {
      message: 'error when deleting comment on server side',
    });
  }
};
