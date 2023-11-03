import { FC, HTMLAttributes, ReactNode } from 'react';

import Typography from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

type ErrorMessageProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ children, className, ...rest }) => {
  return (
    <Typography
      {...rest}
      component='span'
      variant='description'
      className={cn('pl-2 font-bold text-red-700', className)}
    >
      {children}
    </Typography>
  );
};
