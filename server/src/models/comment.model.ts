import { Comment } from '@prisma/client';

import prisma from '@/db/prisma';
import { CommentsWithUser } from '@/types/comment.types';
import { IPagination } from '@/types/response.types';

interface IGetAllCommentsArg extends IPagination {
  postId: string;
  sort: string;
  order: 'asc' | 'desc';
}

interface ICreateCommentArg {
  postId: string;
  userId: string;
  text: string;
}

class CommentModel {
  public getById(id: string): Promise<CommentsWithUser | null> {
    return prisma.comment.findFirst({
      where: { id },
      include: {
        user: { select: { id: true, login: true, name: true, img: true } },
      },
    });
  }
  public getAllByPostId({
    postId,
    page,
    limit,
    sort,
    order,
  }: IGetAllCommentsArg): Promise<CommentsWithUser[]> {
    const offset = (+page - 1) * +limit;

    return prisma.comment.findMany({
      where: { postId },
      skip: offset,
      take: limit,
      orderBy: {
        [sort]: order,
      },
      include: {
        user: { select: { id: true, login: true, name: true, img: true } },
      },
    });
  }
  public getTotalCommentByPost(id: string): Promise<number> {
    return prisma.comment.count({
      where: { postId: id },
    });
  }
  public create({ postId, userId, text }: ICreateCommentArg): Promise<CommentsWithUser> {
    return prisma.comment.create({
      data: {
        postId,
        userId,
        text,
      },
      include: {
        user: { select: { id: true, login: true, name: true, img: true } },
      },
    });
  }
  public deleteById(id: string): Promise<Comment> {
    return prisma.comment.delete({
      where: { id },
    });
  }
}

export default new CommentModel();
