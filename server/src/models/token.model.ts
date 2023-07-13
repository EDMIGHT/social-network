import { Token } from '@prisma/client';

import prisma from '@/db/prisma';
import { CreationToken } from '@/types/token.types';

class TokenModel {
  public async createToken(data: CreationToken): Promise<Token> {
    return prisma.token.create({ data });
  }
  public async getTokenByUserId(userId: string): Promise<Token | null> {
    return prisma.token.findFirst({
      where: { userId },
    });
  }
  public async getToken(refreshToken: string | undefined = undefined): Promise<Token | null> {
    return prisma.token.findFirst({
      where: { refreshToken: refreshToken || undefined },
    });
  }
  public async updateToken(userId: string, refreshToken: string): Promise<Token> {
    return prisma.token.update({
      where: { userId },
      data: {
        refreshToken,
        updatedAt: new Date().toISOString(),
      },
    });
  }
}

export default new TokenModel();
