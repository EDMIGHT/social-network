import { Tag } from '@prisma/client';

import prisma from '@/db/prisma';

interface GetAllTagsArgs {
  name: string;
  page: number;
  limit: number;
  order: string;
}

class TagModel {
  public getAllTags({ name, page, limit, order }: GetAllTagsArgs): Promise<Tag[]> {
    const offset = (page - 1) * limit;

    return prisma.tag.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        name: order === 'desc' ? 'desc' : 'asc',
      },
    });
  }
}

export default new TagModel();
