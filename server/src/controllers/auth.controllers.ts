import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import userModel from '@/models/user.model';
import tokenService from '@/services/token.service';
import { isLoginUser, isRegisterUser } from '@/types/user.types';
import createResponseUser from '@/utils/helpers/createResponseUser';
import customResponse from '@/utils/helpers/customResponse';
import isTokenInvalid from '@/utils/helpers/isTokenInvalid';

export const registerUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    if (isRegisterUser(request.body)) {
      const registeringUser = request.body;

      const user = await userModel.getUserByLogin(registeringUser.login);

      if (user) {
        return customResponse.conflict(response, {
          message: 'User with this login already exists',
        });
      } else {
        const hashedPassword = await bcrypt.hash(registeringUser.password as string, 10);
        const user = await userModel.createUser({
          ...registeringUser,
          password: hashedPassword,
        });

        const tokens = tokenService.createTokens({
          login: user.login,
          id: user.id,
        });

        tokenService.save({
          userId: user.id,
          refreshToken: tokens.refreshToken,
        });

        const responseUser = createResponseUser(user);

        return customResponse.created(response, {
          ...tokens,
          user: responseUser,
        });
      }
    } else {
      return customResponse.badRequest(response, {
        message: 'Invalid request body',
        body: {
          ...request.body,
        },
      });
    }
  } catch (error) {
    return customResponse.serverError(response, {
      message: 'an error occurred on the server side while creating the user',
    });
  }
};

export const loginUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    if (isLoginUser(request.body)) {
      const loggingUser = request.body;

      const user = await userModel.getUserByLogin(loggingUser.login);

      if (!user) {
        return customResponse.unauthorized(response, {
          message: 'User with this login does not exist',
        });
      } else {
        const isPasswordEqual = await bcrypt.compare(
          loggingUser.password as string,
          user.password as string
        );

        if (!isPasswordEqual) {
          return customResponse.unauthorized(response, {
            message: 'incorrect password',
          });
        }

        const tokens = tokenService.createTokens({
          login: user.login,
          id: user.id,
        });
        await tokenService.save({
          userId: user.id,
          refreshToken: tokens.refreshToken,
        });

        const responseUser = createResponseUser(user);

        return customResponse.created(response, {
          ...tokens,
          user: responseUser,
        });
      }
    } else {
      return customResponse.badRequest(response, {
        message: 'Invalid request body',
        body: {
          ...request.body,
        },
      });
    }
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

    const responseUser = createResponseUser(existedUser);

    return customResponse.ok(response, {
      ...tokens,
      user: responseUser,
    });
  } catch (error) {
    console.error('update token: ', error);
    return customResponse.serverError(response, {
      message: `an error occurred on the server while updating tokens: ${error}`,
    });
  }
};
