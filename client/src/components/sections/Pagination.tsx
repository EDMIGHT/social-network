import React from 'react';

import Button from '@/components/ui/Button';

interface PaginationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  setCurrentPage,
  currentPage,
  totalPages,
}) => {
  const onClickNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const onClickPrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className='flex justify-center gap-2'>
      <Button onClick={onClickPrev} disabled={currentPage === 1}>
        prev
      </Button>
      <Button onClick={onClickNext} disabled={currentPage >= totalPages}>
        next
      </Button>
    </div>
  );
};

export default Pagination;
