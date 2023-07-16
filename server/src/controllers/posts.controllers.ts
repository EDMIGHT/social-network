import { Request, Response } from 'express';

import postModel from '@/models/post.model';
import tagModel from '@/models/tag.model';
import customResponse from '@/utils/helpers/customResponse';

export const getAllPosts = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { tags, page = 1, limit = 10, order = 'desc', sort = 'createdAt' } = request.query;

    const tagList = tags ? (tags as string).split(',') : [];
    const totalPostsCount = await postModel.getTotal({
      tags: tagList,
    });

    const posts = await postModel.get({
      page: +page,
      limit: +limit,
      sort: sort as string,
      order: order as string,
      tags: tagList,
    });

    return customResponse.ok(response, {
      posts,
      currentPage: +page,
      totalPages: Math.ceil(totalPostsCount / +limit),
    });
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
export const getPosts = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { tags, page = 1, limit = 10, order = 'desc', sort = 'createdAt' } = request.query;
    const { login } = request.params;

    const tagList = tags ? (tags as string).split(',') : [];
    const totalPostsCount = await postModel.getTotal({
      tags: tagList,
      login,
    });

    const posts = await postModel.get({
      login: login as string,
      page: +page,
      limit: +limit,
      sort: sort as string,
      order: order as string,
      tags: tagList,
    });

    return customResponse.ok(response, {
      posts,
      currentPage: +page,
      totalPages: Math.ceil(totalPostsCount / +limit),
    });
  } catch (error) {
    console.log(error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server side while fetching your (id user = ${request.params.login}) posts, error: ${error}`,
      query: {
        ...request.query,
      },
    });
  }
};
export const getPost = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  try {
    const post = await postModel.getById(id);
    if (post) {
      return customResponse.ok(response, post);
    } else {
      return customResponse.notFound(response, {
        message: `failed to get post with id = ${id}`,
        id,
      });
    }
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server side while fetching the post, error: ${error}`,
      id,
    });
  }
};

export const createPost = async (request: Request, response: Response): Promise<Response> => {
  const { tags } = request.body;

  try {
    const tagList = tags ? (tags as string).split(',') : [];

    const existedTags = await tagModel.getTagsByName(tagList);

    if (existedTags?.length === tagList.length) {
      const post = await postModel.create({
        ...request.body,
        tags: tagList,
        userId: request.user.id,
      });

      return customResponse.created(response, post);
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
      await postModel.deleteById(id);

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
      id,
    });
  }
};

export const updatePost = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  const { tags } = request.body;

  try {
    const tagList = tags ? (tags as string).split(',') : [];

    const existedPost = await postModel.getById(id);
    const existedTags = await tagModel.getTagsByName(tagList);

    if (existedPost && existedTags?.length === tagList.length) {
      const post = await postModel.updateById(id, { ...request.body, tags: existedTags });

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

export const toggleLikePost = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  try {
    const existedPost = await postModel.getById(id);

    if (!existedPost) {
      return customResponse.notFound(response, {
        message: `post with id = ${id} does not exist`,
      });
    }

    const checkExist = existedPost.likedBy.some((user) => user.id === request.user.id);

    let updatedPost;

    if (checkExist) {
      updatedPost = await postModel.removeFromLikedBy(id, request.user.id);
    } else {
      updatedPost = await postModel.pushToLikedBy(id, request.user.id);
    }

    return customResponse.ok(response, updatedPost);
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: `error when liking post with id ${id}`,
    });
  }
};

export const increaseView = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  try {
    const existedPost = await postModel.getById(id);

    if (!existedPost) {
      return customResponse.notFound(response, {
        message: `post with id = ${id} does not exist`,
      });
    }

    const updatedPost = await postModel.increaseCountView(id);

    return customResponse.ok(response, updatedPost);
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: `error when adding view post with id ${id}`,
    });
  }
};
