import React from 'react';

interface ButtonProps {
  children: string;
  variant: 'activity' | 'highlight' | 'alert' | 'warn';
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
      className={`whitespace-nowrap rounded p-2 text-center ${variant} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
