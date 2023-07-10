import { User } from '@prisma/client';

import { RegisterUser } from './user.types';

export interface IUserModel {
  createUser: (data: RegisterUser) => Promise<User>;
  getUserByLogin: (login: string) => Promise<User | null>;
}
