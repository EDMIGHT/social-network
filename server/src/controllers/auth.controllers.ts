import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import prisma from '@/db/prisma';
import { RegisterUser, isRegisterUser } from '@/types/auth.types';
import { createUser } from '@/models/user.models';
import customResponse from '@/utils/helpers/customResponse';

const accessKey = process.env.accessKey ?? '';
const expiresIn = process.env.expiresIn ?? 86400;

export const registerUser = async (
  request: Request<RegisterUser>,
  response: Response
): Promise<void> => {
  try {
    const errors = validationResult(request);

    if (errors.isEmpty() && isRegisterUser(request.body)) {
      const registeringUser = request.body;

      const user = await prisma.user.findUnique({
        where: { login: registeringUser.login },
      });

      if (user) {
        customResponse.conflict(response, {
          message: 'User with this login already exists',
        });
      } else {
        const hashedPassword = await bcrypt.hash(registeringUser.password, 10);
        const user = await createUser({
          ...registeringUser,
          password: hashedPassword,
        });

        const accessToken = jwt.sign(
          {
            login: user.login,
            id: user.id,
          },
          accessKey,
          {
            expiresIn,
          }
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...responseUser } = user;

        customResponse.created(response, {
          user: responseUser,
          accessToken,
        });
      }
    } else {
      customResponse.badRequest(response, {
        message: 'Invalid request body',
        details: errors.array(),
      });
    }
  } catch (error) {
    customResponse.serverError(response, {
      message: 'an error occurred on the server side while creating the user',
    });
  }
};
