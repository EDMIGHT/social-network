import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';

import { useGetAllPostsQuery } from '@/services/post.service';
import { useGetLikedPostsQuery } from '@/services/users.service';
import { IResponsePost } from '@/types/responses.types';
import { Tag } from '@/types/tag.types';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

interface IUseInfiniteScrollPostsOptions {
  tags?: Tag[];
  login?: string;
  limit?: number;
  query: typeof useGetAllPostsQuery | typeof useGetLikedPostsQuery;
}

type IUseInfiniteScrollPostsReturns = [IResponsePost[], boolean, boolean, boolean];

// TODO понять как отслеживать динамическое изменение состояния

export const useInfiniteScrollPosts = ({
  tags,
  login,
  limit = 2,
  query,
}: IUseInfiniteScrollPostsOptions): IUseInfiniteScrollPostsReturns => {
  const [posts, setPosts] = useState<IResponsePost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const tagsQuery = tags && formatTagsForQuery(tags);

  useEffect(() => {
    setCurrentPage(1);
    setPosts([]);
  }, [tags]);

  const { data, isSuccess, isFetching, isError } = query({
    tags: tagsQuery,
    login: login as string,
    page: currentPage,
    limit,
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (!isFetching && isSuccess && data) {
      setPosts((prev) => {
        const existingIds = prev.map((post) => post.id);
        const newPosts = data.posts.filter((post) => !existingIds.includes(post.id));
        return [...prev, ...newPosts];
      });
    }
  }, [isSuccess, isFetching, data]);

  const debouncedOnScroll = useCallback(
    debounce((e: Event) => {
      const { documentElement } = e.target as Document;
      const isBottom =
        documentElement.scrollHeight - (documentElement.scrollTop + window.innerHeight) < 100;

      if (isBottom && currentPage < totalPages && !isFetching) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }, 60),
    [currentPage, totalPages, isFetching]
  );

  useEffect(() => {
    window.addEventListener('scroll', debouncedOnScroll);

    return () => {
      window.removeEventListener('scroll', debouncedOnScroll);
    };
  }, [currentPage, totalPages, isFetching]);

  return [posts, isSuccess, isFetching, isError];
};
