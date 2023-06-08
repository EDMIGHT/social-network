import { NextFunction, Request, Response } from 'express';

import userModel from '@/models/user.model';
import tokenService from '@/services/token.service';
import customResponse from '@/utils/helpers/customResponse';

const authentication = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return customResponse.unauthorized(response, {
        message: 'unauthorized access',
      });
    }

    const dataFromToken = tokenService.verifyAccessToken(token);

    if (
      dataFromToken &&
      dataFromToken.exp &&
      dataFromToken.exp > Math.floor(Date.now() / 1000)
    ) {
      const existedUser = await userModel.getUseById(dataFromToken.id);
      if (existedUser) {
        request.user = dataFromToken;
        return next();
      } else {
        return customResponse.unauthorized(response, {
          message: 'request from non-existent user',
        });
      }
    }
  } catch (error) {
    return customResponse.serverError(response, {
      message: 'an error occurred during authentication on the north side',
    });
  }
};

export default authentication;
