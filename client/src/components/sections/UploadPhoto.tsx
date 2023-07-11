import React, { ReactNode, useRef } from 'react';

import { cn } from '@/utils/cn';

interface UploadPhotoProps {
  className?: string;
  children: ReactNode;
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onChangeFile, className, children }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type='button'
        onClick={() => inputFileRef.current && inputFileRef.current.click()}
        className={cn(className)}
      >
        {children}
        {/* <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          className='h-8 w-8 stroke-primary hover:stroke-accent'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13'
          />
        </svg> */}
      </button>
      <input ref={inputFileRef} onChange={onChangeFile} type='file' hidden />
    </>
  );
};

export default UploadPhoto;
