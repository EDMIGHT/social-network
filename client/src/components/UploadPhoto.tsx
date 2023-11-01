import React, { ReactNode, useRef } from 'react';

import { cn } from '@/utils/cn';
import { convertImgToBase64 } from '@/utils/convertImgToBase64';

interface UploadPhotoProps {
  className?: string;
  children: ReactNode;
  onChangeFile: (img: string | null) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onChangeFile, className, children }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const changeFileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      try {
        const convertedImg = await convertImgToBase64(file);

        onChangeFile(convertedImg);
      } catch (error) {
        onChangeFile(null);
      }
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={() => inputFileRef.current && inputFileRef.current.click()}
        className={cn(className)}
      >
        {children}
      </button>
      <input ref={inputFileRef} onChange={changeFileHandler} type='file' hidden />
    </>
  );
};

export default UploadPhoto;
