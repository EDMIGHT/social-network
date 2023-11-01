import React from 'react';

import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

interface UsersEmptyProps {
  text?: string;
  className?: string;
}

const UsersEmpty: React.FC<UsersEmptyProps> = ({ text = 'no users found', className }) => {
  return (
    <Card className={cn('flex h-full flex-col items-center justify-center', className)}>
      <Typography component='h2' variant='title-2'>
        {text}
      </Typography>
      <div className='text-[7rem]'>🤔</div>
    </Card>
  );
};

export default UsersEmpty;
