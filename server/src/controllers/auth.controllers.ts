import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import User from '@/models/user.model';
import tokenService from '@/services/token.service';
import { isLoginUser, isRegisterUser, LoginUser, RegisterUser } from '@/types/auth.types';
import customResponse from '@/utils/helpers/customResponse';

export const registerUser = async (
  request: Request<RegisterUser>,
  response: Response
): Promise<void> => {
  try {
    const errors = validationResult(request);

    if (errors.isEmpty() && isRegisterUser(request.body)) {
      const registeringUser = request.body;

      const user = await User.getUserByLogin(registeringUser.login);

      if (user) {
        return customResponse.conflict(response, {
          message: 'User with this login already exists',
        });
      } else {
        const hashedPassword = await bcrypt.hash(registeringUser.password, 10);
        const user = await User.createUser({
          ...registeringUser,
          password: hashedPassword,
        });

        const accessToken = tokenService.createAccessToken({
          login: user.login,
          id: user.id,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...responseUser } = user;

        return customResponse.created(response, {
          user: responseUser,
          accessToken,
        });
      }
    } else {
      return customResponse.badRequest(response, {
        message: 'Invalid request body',
        details: errors.array(),
      });
    }
  } catch (error) {
    return customResponse.serverError(response, {
      message: 'an error occurred on the server side while creating the user',
    });
  }
};

export const loginUser = async (
  request: Request<LoginUser>,
  response: Response
): Promise<void> => {
  try {
    const errors = validationResult(request);

    if (errors.isEmpty() && isLoginUser(request.body)) {
      const loggingUser = request.body;

      const user = await User.getUserByLogin(loggingUser.login);

      if (!user) {
        return customResponse.unauthorized(response, {
          message: 'User with this login does not exist',
        });
      } else {
        const isPasswordEqual = await bcrypt.compare(loggingUser.password, user.password);

        if (!isPasswordEqual) {
          return customResponse.unauthorized(response, {
            message: 'incorrect password',
          });
        }

        const accessToken = tokenService.createAccessToken({
          login: user.login,
          id: user.id,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...responseUser } = user;

        return customResponse.created(response, {
          user: responseUser,
          accessToken,
        });
      }
    } else {
      return customResponse.badRequest(response, {
        message: 'Invalid request body',
        details: errors.array(),
      });
    }
  } catch (error) {
    return customResponse.serverError(response, {
      message: 'an error occurred while authorizing the user on the server side',
    });
  }
};
