import { Tag } from '@prisma/client';

import prisma from '@/db/prisma';
import { IPagination } from '@/types/response.types';

interface IGetAllArgs extends IPagination {
  name: string;
  order: string;
}

interface ICreateArgs {
  name: string;
}

interface IUpdateArgs {
  name: string;
}

class TagModel {
  public getAll({ name, page, limit, order }: IGetAllArgs): Promise<Tag[]> {
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
  public getTagById(id: string): Promise<Tag | null> {
    return prisma.tag.findFirst({
      where: { id },
    });
  }
  public getTagsById(ids: string[]): Promise<Tag[] | null> {
    return prisma.tag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  public getTagByName(name: string): Promise<Tag | null> {
    return prisma.tag.findFirst({
      where: {
        name,
      },
    });
  }
  public getTagsByName(names: string[]): Promise<Tag[] | null> {
    return prisma.tag.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });
  }

  public create(data: ICreateArgs): Promise<Tag> {
    return prisma.tag.create({ data });
  }

  public update(id: string, data: IUpdateArgs): Promise<Tag> {
    return prisma.tag.update({
      where: { id },
      data,
    });
  }
}

export default new TagModel();
