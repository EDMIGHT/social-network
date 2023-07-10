import prisma from '@/db/prisma';
import { CommentsWithUser } from '@/types/comment.types';

interface GetAllCommentsArg {
  postId: string;
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
}

interface CreateCommentArg {
  postId: string;
  userId: string;
  text: string;
}

class CommentModel {
  public getAllByPostId({
    postId,
    page,
    limit,
    sort,
    order,
  }: GetAllCommentsArg): Promise<CommentsWithUser[]> {
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
  public create({ postId, userId, text }: CreateCommentArg): Promise<CommentsWithUser> {
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
}

export default new CommentModel();
