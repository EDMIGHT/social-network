import React from 'react';

import { cn } from '@/utils/cn';

interface ButtonProps {
  children: string;
  variant?: 'activity' | 'highlight' | 'alert' | 'warn';
  className?: string;
  onClick?: any;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'activity',
  className,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const onClickHandler = typeof onClick === 'function' ? () => onClick() : undefined;

  return (
    <button
      type={type ?? 'button'}
      onClick={onClickHandler}
      className={cn(
        variant,
        className,
        'whitespace-nowrap rounded p-2 text-center disabled:bg-muted'
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
