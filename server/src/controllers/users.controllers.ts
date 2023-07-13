import { Request, Response } from 'express';

import postModel from '@/models/post.model';
import userModel from '@/models/user.model';
import createResponseUser from '@/utils/helpers/createResponseUser';
import customResponse from '@/utils/helpers/customResponse';

export const getProfile = async (request: Request, response: Response): Promise<Response> => {
  const { login } = request.params;

  try {
    const existedProfile = await userModel.getUserByLoginWithData(login);

    if (existedProfile) {
      return customResponse.ok(response, createResponseUser(existedProfile));
    } else {
      return customResponse.notFound(response, {
        message: 'user with this login does not exist',
        login,
      });
    }
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message:
        'an error occurred on the server side when getting a user profile with such logs',
      login,
    });
  }
};

export const getLikedPosts = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { login } = request.params;
  const { tags, page = 1, limit = 10, order = 'desc', sort = 'createdAt' } = request.query;
  try {
    const tagList = tags ? (tags as string).split(',') : [];

    const likedPosts = await postModel.getLikedPosts({
      login,
      page: +page,
      limit: +limit,
      order: order as string,
      sort: sort as string,
      tags: tagList,
    });
    const totalLikedPosts = await postModel.getTotalLikedPostByUser({
      login,
      tags: tagList,
    });

    return customResponse.ok(response, {
      posts: likedPosts,
      currentPage: page,
      totalPages: Math.floor(totalLikedPosts / +limit),
    });
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: 'error on the server when fetching the users favorite posts',
    });
  }
};

export const getFollowers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { login } = request.params;
  const { page = 1, limit = 10 } = request.query;
  try {
    const followers = await userModel.getFollowers({
      login,
      page: +page,
      limit: +limit,
    });
    const totalFollowers = await userModel.getTotalFollowers(login);

    return customResponse.ok(response, {
      followers,
      currentPage: page,
      totalPages: Math.floor(totalFollowers / +limit),
    });
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: 'error on the server when fetching the users favorite posts',
    });
  }
};

export const getFollowing = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { login } = request.params;
  const { page = 1, limit = 10 } = request.query;
  try {
    const followers = await userModel.getFollowing({
      login,
      page: +page,
      limit: +limit,
    });
    const totalFollowers = await userModel.getTotalFollowing(login);

    return customResponse.ok(response, {
      followers,
      currentPage: page,
      totalPages: Math.floor(totalFollowers / +limit),
    });
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: 'error on the server when fetching the users favorite posts',
    });
  }
};

export const toggleFollowUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { login } = request.params;

  try {
    const existedUser = await userModel.getUserByLogin(login);

    if (!existedUser) {
      return customResponse.notFound(response, {
        message: 'the user with the specified login does not exist',
        login,
      });
    }

    const checkExist = existedUser.followers.some((user) => user.id === request.user.id);

    let updatedUser;

    if (checkExist) {
      updatedUser = await userModel.unfollow(login, request.user.login);
    } else {
      updatedUser = await userModel.follow(login, request.user.login);
    }

    return customResponse.ok(response, updatedUser);
  } catch (error) {
    console.error(error);
    return customResponse.serverError(response, {
      message: 'a server-side error occurred while subscribing to a user',
    });
  }
};
