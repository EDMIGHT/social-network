import clsx from 'clsx';
import React from 'react';

interface PopupProps {
  isActive: boolean;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isActive, children }) => {
  return (
    <div
      className={clsx(
        !isActive && 'opacity-0',
        'absolute top-full mt-1 -translate-x-1/2 overflow-hidden rounded bg-activity transition-all'
      )}
    >
      {children}
    </div>
  );
};

export default Popup;
