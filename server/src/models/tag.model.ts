import { Tag } from '@prisma/client';

import prisma from '@/db/prisma';

interface GetAllArgs {
  name: string;
  page: number;
  limit: number;
  order: string;
}

interface CreateArgs {
  name: string;
}

class TagModel {
  public getAll({ name, page, limit, order }: GetAllArgs): Promise<Tag[]> {
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

  public create(data: CreateArgs): Promise<Tag> {
    return prisma.tag.create({ data });
  }
}

export default new TagModel();
