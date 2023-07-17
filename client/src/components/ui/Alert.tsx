import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

interface AlertProps {
  type: 'success' | 'error';
  children: ReactNode;
}

const Alert: FC<AlertProps> = ({ type = 'success', children }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isOpen
    ? createPortal(
        <div
          className={cn(
            'fixed bottom-10 left-1/2 -translate-x-1/2 z-20 p-3 rounded transition-all',
            type === 'success' && 'bg-green-600',
            type === 'error' && 'bg-red-700'
          )}
        >
          {children}
        </div>,
        document.body
      )
    : null;
};

export default Alert;
