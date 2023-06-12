import React from 'react';

interface ButtonProps {
  text: string;
  variant: 'activity' | 'highlight' | 'alert' | 'warn';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, variant, className }) => {
  return (
    <button
      className={`whitespace-nowrap rounded p-2 text-center hover:contrast-125 ${variant} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
