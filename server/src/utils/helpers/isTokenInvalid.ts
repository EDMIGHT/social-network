import { Token } from '@prisma/client';

import { VerifiedTokenPayload } from '@/types/token.types';

const isTokenInvalid = (dbToken: Token, tokenPayload: VerifiedTokenPayload): boolean => {
  return dbToken.userId !== tokenPayload.id;
};

export default isTokenInvalid;
