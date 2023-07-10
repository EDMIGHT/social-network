import { Comment } from '@prisma/client';

import { IncludedUser } from './user.types';

export type CommentsWithUser = Comment & {
  user: IncludedUser;
};
