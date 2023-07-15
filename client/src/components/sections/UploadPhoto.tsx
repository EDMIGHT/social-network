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
      </button>
      <input ref={inputFileRef} onChange={onChangeFile} type='file' hidden />
    </>
  );
};

export default UploadPhoto;
