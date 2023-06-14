import React from 'react';

interface ButtonProps {
  children: string;
  variant: 'activity' | 'highlight' | 'alert' | 'warn';
  className?: string;
  onClick?: any;
}

const Button: React.FC<ButtonProps> = ({ children, variant, className, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`whitespace-nowrap rounded p-2 text-center ${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
