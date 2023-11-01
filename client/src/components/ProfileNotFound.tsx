import React from 'react';

import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

interface ProfileNotFoundProps {
  text?: string;
  className?: string;
}

const ProfileNotFound: React.FC<ProfileNotFoundProps> = ({
  className,
  text = 'profile not found',
}) => {
  return (
    <Card className={cn('flex h-full gap-2 items-center justify-center', className)}>
      <Typography component='h2' variant='title-2'>
        {text}
      </Typography>
      <div className='text-[7rem]'>🤔</div>
    </Card>
  );
};

export default ProfileNotFound;
