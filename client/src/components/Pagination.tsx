import React, { HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/Icons';
import { cn } from '@/utils/cn';

type PaginationProps = HTMLAttributes<HTMLUListElement> & {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  pageRange?: number;
  isBlocked?: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  setCurrentPage,
  currentPage,
  totalPages,
  pageRange = 2,
  isBlocked = false,
  className,
  ...rest
}) => {
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  let startPage: number;
  let endPage: number;
  if (totalPages <= pageRange * 2 + 1) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= pageRange + 1) {
    startPage = 1;
    endPage = Math.min(pageRange * 2 + 1, totalPages);
  } else if (currentPage + pageRange >= totalPages) {
    startPage = Math.max(totalPages - pageRange * 2, 1);
    endPage = totalPages;
  } else {
    startPage = currentPage - pageRange;
    endPage = currentPage + pageRange;
  }

  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

  return (
    <ul {...rest} className={cn('flex items-center justify-center gap-1 text-lg', className)}>
      <li>
        <button
          type='button'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isBlocked || !hasPrevPage}
          className={cn(
            'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full  ',
            isBlocked || !hasPrevPage ? 'text-muted' : 'cursor-pointer hover:bg-muted'
          )}
        >
          <Icons.arrowLeft className='h-6 w-6' />
        </button>
      </li>
      {startPage > 1 && (
        <>
          <li>
            <button
              type='button'
              disabled={isBlocked}
              onClick={() => handlePageChange(1)}
              className='flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded enabled:hover:bg-primary disabled:brightness-75'
            >
              1
            </button>
          </li>
          <li>
            <span
              className={cn(
                'flex h-[2.5rem] w-[2.5rem] items-center justify-center',
                isBlocked && 'brightness-75'
              )}
            >
              <Icons.more className='h-6 w-6' />
            </span>
          </li>
        </>
      )}

      {pages.map((page, i) => (
        <li key={i}>
          <button
            key={page}
            type='button'
            onClick={() => handlePageChange(page)}
            disabled={isBlocked || page === currentPage}
            className={cn(
              'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded enabled:hover:bg-muted',
              page === currentPage && 'bg-accent hover:opacity-80',
              isBlocked && 'brightness-75'
            )}
          >
            {page}
          </button>
        </li>
      ))}
      {endPage < totalPages && (
        <>
          <li>
            <span
              className={cn(
                'flex h-[2.5rem] w-[2.5rem] items-center justify-center',
                isBlocked && 'brightness-75'
              )}
            >
              <Icons.more className='h-6 w-6' />
            </span>
          </li>
          <li>
            <button
              type='button'
              disabled={isBlocked}
              onClick={() => handlePageChange(totalPages)}
              className={cn(
                'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded  enabled:hover:bg-muted disabled:brightness-75'
              )}
            >
              {totalPages}
            </button>
          </li>
        </>
      )}

      <li>
        <button
          type='button'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isBlocked || !hasNextPage}
          className={cn(
            'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full  ',
            isBlocked || !hasNextPage ? 'text-muted' : 'cursor-pointer hover:bg-muted'
          )}
        >
          <Icons.arrowRight className='h-6 w-6' />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
