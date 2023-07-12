import { Request, Response } from 'express';

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
