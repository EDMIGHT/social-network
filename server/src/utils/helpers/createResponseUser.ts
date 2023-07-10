import { User } from '@prisma/client';

import { ResponseUser } from '@/types/user.types';

const createResponseUser = (user: User | null): ResponseUser | null => {
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...responseUser } = user;

    return responseUser;
  } else return null;
};

export default createResponseUser;
