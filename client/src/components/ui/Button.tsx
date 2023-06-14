import React from 'react';

interface ButtonProps {
  children: string;
  variant: 'activity' | 'highlight' | 'alert' | 'warn';
  className?: string;
  onClick?: any;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, variant, className, onClick, type }) => {
  const onClickHandler = typeof onClick === 'function' ? () => onClick() : undefined;

  return (
    <button
      type={type ?? 'button'}
      onClick={onClickHandler}
      className={`whitespace-nowrap rounded p-2 text-center ${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
