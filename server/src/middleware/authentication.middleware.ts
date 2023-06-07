import { NextFunction, Request, Response } from 'express';

import tokenService from '@/services/token.service';
import customResponse from '@/utils/helpers/customResponse';

const authentication = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
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
      request.user = dataFromToken;
      return next();
    }
  } catch (error) {
    return customResponse.serverError(response, {
      message: 'an error occurred during authentication on the north side',
    });
  }
};

export default authentication;
