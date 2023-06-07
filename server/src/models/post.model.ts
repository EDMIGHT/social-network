import { Post } from '@prisma/client';

import prisma from '@/db/prisma';
import { GetPostArg } from '@/types/post.types';

class PostModel {
  public async getPosts({ page, limit, sort, order, tags }: GetPostArg): Promise<Post[]> {
    const offset = (page - 1) * limit;
    const tagList = tags ? (tags as string).split(',') : [];

    return await prisma.post.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        [sort as string]: order,
      },
      where: {
        tags: {
          some: {
            name: {
              in: tagList,
            },
          },
        },
      },
    });
  }
}

export default new PostModel();
