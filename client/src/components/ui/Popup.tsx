import React from 'react';

import { cn } from '@/utils/cn';

interface PopupProps {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}

const Popup: React.FC<PopupProps> = ({ isActive, children, className }) => {
  return (
    <div
      className={cn(
        !isActive && 'opacity-0',
        'absolute top-full mt-1 -translate-x-1/2 overflow-hidden rounded bg-primary transition-all z-10',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Popup;
