import React, { ButtonHTMLAttributes } from 'react';

import { Icons } from '@/components/ui/Icons';
import { cn } from '@/utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  variant?: 'activity' | 'highlight' | 'alert' | 'warn';
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'activity',
  className,
  onClick,
  type = 'button',
  disabled,
  isLoading = false,
}) => {
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      className={cn(
        variant,
        className,
        'whitespace-nowrap rounded p-2 disabled:bg-muted flex items-center justify-center'
      )}
      disabled={isLoading || disabled}
    >
      {children}
      {isLoading && <Icons.loading className='h-8 w-8 animate-spin stroke-primary' />}
    </button>
  );
};

export default Button;
