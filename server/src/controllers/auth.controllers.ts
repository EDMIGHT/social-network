import { Request, Response } from 'express';

import userModel from '@/models/user.model';
import { PasswordService } from '@/services/password.service';
import tokenService from '@/services/token.service';
import cloudinary from '@/utils/cloudinary';
import createResponseUser from '@/utils/helpers/createResponseUser';
import customResponse from '@/utils/helpers/customResponse';
import isTokenInvalid from '@/utils/helpers/isTokenInvalid';

const ROOT_FOLDER_CLOUDINARY = process.env.ROOT_FOLDER_CLOUDINARY;

export const registerUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { login, password, img } = request.body;

    const existedUser = await userModel.getUserByLogin(login);

    if (existedUser) {
      return customResponse.conflict(response, {
        message: 'User with this login already exists',
      });
    }

    const uploadedImg = img
      ? await cloudinary.uploader.upload(img, {
          folder: `${ROOT_FOLDER_CLOUDINARY}/users`,
        })
      : null;

    const hashedPassword = await PasswordService.hash(password);
    const user = await userModel.createUser({
      ...request.body,
      password: hashedPassword,
      img:
        uploadedImg?.secure_url ||
        `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${login}&backgroundColor=b6e3f4,c0aede,d1d4f9`,
    });

    const tokens = tokenService.createTokens({
      login: user.login,
      id: user.id,
    });

    tokenService.save({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    });

    return customResponse.created(response, {
      ...tokens,
      user: createResponseUser(user),
    });
  } catch (error) {
    return customResponse.serverError(response, {
      message: 'an error occurred on the server side while creating the user',
    });
  }
};

export const loginUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { login, password } = request.body;

    const existedUser = await userModel.getUserByLogin(login);

    if (!existedUser) {
      return customResponse.unauthorized(response, {
        message: 'User with this login does not exist',
      });
    }

    const isPasswordEqual = await PasswordService.compare(password, existedUser.password);
    if (!isPasswordEqual) {
      return customResponse.unauthorized(response, {
        message: 'incorrect password',
      });
    }

    const tokens = tokenService.createTokens({
      login: existedUser.login,
      id: existedUser.id,
    });
    await tokenService.save({
      userId: existedUser.id,
      refreshToken: tokens.refreshToken,
    });

    return customResponse.created(response, {
      ...tokens,
      user: createResponseUser(existedUser),
    });
  } catch (error) {
    return customResponse.serverError(response, {
      message: 'an error occurred while authorizing the user on the server side',
    });
  }
};

export const authMe = async (request: Request, response: Response): Promise<Response> => {
  try {
    const existedUser = await userModel.getUserById(request.user.id);

    return customResponse.ok(response, createResponseUser(existedUser));
  } catch (error) {
    console.log(error);
    return customResponse.serverError(response, {
      id: request.user.id,
      message: 'an error occurred on the server side while getting user information',
    });
  }
};

export const updateTokens = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { refreshToken } = request.body;

    const tokenPayload = await tokenService.verifyRefreshToken(refreshToken);
    const dbToken = await tokenService.findRefreshToken(refreshToken);

    if (!dbToken || !tokenPayload || isTokenInvalid(dbToken, tokenPayload)) {
      return customResponse.unauthorized(response, {
        message: 'unauthorized access',
      });
    }

    const tokens = tokenService.createTokens({
      id: tokenPayload.id,
      login: tokenPayload.login,
    });
    await tokenService.save({
      userId: tokenPayload.id,
      refreshToken: tokens.refreshToken,
    });

    const existedUser = await userModel.getUserByLogin(tokenPayload.login);

    return customResponse.ok(response, {
      ...tokens,
      user: createResponseUser(existedUser),
    });
  } catch (error) {
    console.error('update token: ', error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server while updating tokens: ${error}`,
    });
  }
};
