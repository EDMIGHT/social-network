import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`rounded bg-light-bg-content p-3 ${className}`}>{children}</div>;
};

export default Card;
