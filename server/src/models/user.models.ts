import prisma from '@/db/prisma';
import { RegisterUser } from '@/types/auth.types';
import { User } from '@prisma/client';

export const createUser = async (data: RegisterUser): Promise<User> => {
  return prisma.user.create({ data });
};
