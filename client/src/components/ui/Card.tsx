import React from 'react';

import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={cn('rounded bg-card p-3', className)}>{children}</div>;
};

export default Card;
