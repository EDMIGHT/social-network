import { User } from '@prisma/client';

import prisma from '@/db/prisma';
import { RegisterUser } from '@/types/auth.types';
import { IUserModel } from '@/types/user.model.interface';

class UserModel implements IUserModel {
  async createUser(data: RegisterUser): Promise<User> {
    return prisma.user.create({ data });
  }
  async getUserByLogin(login: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { login },
    });
  }
  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { id },
    });
  }
}

export default new UserModel();
